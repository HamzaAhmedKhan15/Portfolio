import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import "../../assets/css/mycss.css";
import "../../index.css";
import Signature from "../../assets/images/signature.png";
import { FiFileText } from "react-icons/fi";

const RESUME_PDF = `${process.env.PUBLIC_URL}/HamzaAhmedKhan_Resume.pdf`;
const MOBILE_NAV_MAX = 900;
/** Scroll distance (px) past which the fixed header shrinks + darkens */
const HEADER_SHRINK_THRESHOLD = 16;

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#service", label: "Skills" },
  { href: "#project", label: "Projects" },
  { href: "#footer", label: "Contact" },
];

const Header = () => {
  const [bar, setBar] = useState(false);
  const [isNarrow, setIsNarrow] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_NAV_MAX : false
  );
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined"
      ? (window.scrollY ?? 0) > HEADER_SHRINK_THRESHOLD
      : false
  );
  const [spacerH, setSpacerH] = useState(0);
  const shellRef = useRef(null);
  const menuButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const next = window.innerWidth <= MOBILE_NAV_MAX;
      setIsNarrow(next);
      if (!next) setBar(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Close the dropdown when clicking outside it (and not on the toggle button)
     or pressing Escape — keeps the menu lightweight without a full overlay. */
  useEffect(() => {
    if (!isNarrow || !bar) return undefined;
    const onPointerDown = (e) => {
      if (
        dropdownRef.current?.contains(e.target) ||
        menuButtonRef.current?.contains(e.target)
      ) {
        return;
      }
      setBar(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setBar(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isNarrow, bar]);

  /* Toggle the shrunk/darkened state once the user scrolls past the threshold. */
  useEffect(() => {
    const onScroll = () => {
      const next = (window.scrollY ?? 0) > HEADER_SHRINK_THRESHOLD;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Spacer preserves the page's original top offset so the rest of the layout
     doesn't jump when the header leaves the flow. We capture the height while
     the header is at full (unscrolled) size so it stays constant after shrinking. */
  useLayoutEffect(() => {
    if (!shellRef.current) return undefined;
    const measure = () => {
      if (!shellRef.current) return;
      if ((window.scrollY ?? 0) <= HEADER_SHRINK_THRESHOLD) {
        setSpacerH(shellRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isNarrow]);

  const closeMenu = () => setBar(false);
  /* Keep the bar dark while the mobile menu is open so the header reads
     correctly against the dark overlay underneath. */
  const opaque = scrolled || (isNarrow && bar);

  /* Only the currently-rendered Resume link carries the blast-anchor id —
     having two elements with the same id is invalid and can make
     getElementById resolve to the stale one across responsive transitions. */
  const blastAnchorIdProps = (active) =>
    active ? { id: "resume-blast-anchor" } : {};

  const resumeControl = (
    <a
      {...blastAnchorIdProps(isNarrow)}
      href={RESUME_PDF}
      target="_blank"
      rel="noopener noreferrer"
      className="download-link"
      onClick={closeMenu}
    >
      <ResumeControlButton>
        Resume
        <ResumeFileIcon aria-hidden />
      </ResumeControlButton>
    </a>
  );

  const navLinks = (
    <>
      {NAV_LINKS.map(({ href, label }) => (
        <span key={href}>
          <a href={href} onClick={closeMenu}>
            {label}
          </a>
        </span>
      ))}
      <span>
        <a
          {...blastAnchorIdProps(!isNarrow)}
          href={RESUME_PDF}
          target="_blank"
          rel="noopener noreferrer"
          className="download-link"
          onClick={closeMenu}
        >
          <button type="button" className="space">
            Resume
            <ResumeFileIcon aria-hidden />
          </button>
        </a>
      </span>
    </>
  );

  return (
    <>
      <Shell ref={shellRef} $opaque={opaque}>
        <Container bar={bar} $scrolled={scrolled}>
          <LogoBlock>
            <a href="/" onClick={closeMenu}>
              <SignatureImg
                $scrolled={scrolled}
                src={Signature}
                alt="Home"
              />
            </a>
          </LogoBlock>

          {isNarrow ? (
            <MobileTop>
              {resumeControl}
              <MenuAnchor>
                <MenuButton
                  ref={menuButtonRef}
                  type="button"
                  className="bars"
                  aria-label={bar ? "Close menu" : "Open menu"}
                  aria-expanded={bar}
                  aria-haspopup="menu"
                  onClick={() => setBar((v) => !v)}
                >
                  <div className="bar" />
                </MenuButton>
                <MobileDropdown
                  ref={dropdownRef}
                  $open={bar}
                  role="menu"
                  aria-hidden={!bar}
                >
                  {NAV_LINKS.map(({ href, label }) => (
                    <MobileNavLink
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={closeMenu}
                    >
                      {label}
                    </MobileNavLink>
                  ))}
                </MobileDropdown>
              </MenuAnchor>
            </MobileTop>
          ) : (
            <NavDesktop>{navLinks}</NavDesktop>
          )}
        </Container>
      </Shell>
      <HeaderSpacer style={{ height: spacerH * 1.4 }} aria-hidden="true" />
    </>
  );
};

export default Header;

const Shell = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 250;
  /* Matches the Services card gradient so the scrolled bar reads as part
     of the same visual system. Transparent at rest so the hero is untouched. */
  background: ${(p) =>
    p.$opaque
      ? "linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(0, 0, 0) 100%)"
      : "transparent"};
  box-shadow: ${(p) =>
    p.$opaque ? "0 8px 24px rgba(0, 0, 0, 0.45)" : "none"};
  border-bottom: 1px solid
    ${(p) => (p.$opaque ? "rgba(255, 255, 255, 0.06)" : "transparent")};
  transition: background 0.28s ease, box-shadow 0.28s ease,
    border-color 0.28s ease;
`;

const HeaderSpacer = styled.div`
  width: 100%;
  flex-shrink: 0;
`;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 0.75rem;
  max-width: 1280px;
  width: min(92%, 1280px);
  margin: 0 auto;
  padding: ${(p) =>
      p.$scrolled
        ? "clamp(0.3rem, 0.9vw, 0.55rem)"
        : "clamp(0.75rem, 2vw, 1.5rem)"}
    clamp(0.5rem, 2vw, 0.75rem);
  position: relative;
  z-index: 200;
  animation: header 500ms ease-in-out;
  transition: padding 0.28s ease;

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    width: min(100%, 1280px);
    padding-left: clamp(0.65rem, 3vw, 1rem);
    padding-right: clamp(0.65rem, 3vw, 1rem);
  }

  .bars {
    display: none;
  }

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    .bars {
      width: 44px;
      height: 44px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      flex-shrink: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 220;

      .bar {
        position: absolute;
        width: 22px;
        height: 2px;
        background-color: ${(props) =>
          props.bar ? "transparent" : "#fff"};
        transition: all 400ms ease-in-out;
        :before,
        :after {
          content: "";
          width: 22px;
          height: 2px;
          background-color: #fff;
          position: absolute;
          left: 0;
        }

        :before {
          transform: ${(props) =>
            props.bar ? "rotate(45deg)" : "translateY(-7px)"};
          transition: all 400ms ease-in-out;
        }

        :after {
          transform: ${(props) =>
            props.bar ? "rotate(-45deg)" : "translateY(7px)"};
          transition: all 400ms ease-in-out;
        }
      }
    }
  }
`;

const LogoBlock = styled.div`
  flex: 1;
  min-width: 0;

  a {
    display: inline-block;
    max-width: 100%;
  }
`;

const SignatureImg = styled.img`
  width: ${(p) => (p.$scrolled ? "min(40%, 160px)" : "min(50%, 200px)")};
  max-width: ${(p) => (p.$scrolled ? "180px" : "220px")};
  height: auto;
  margin-top: ${(p) =>
    p.$scrolled ? "0.1rem" : "clamp(0.25rem, 1.5vw, 1.25rem)"};
  cursor: pointer;
  display: block;
  transition: width 0.28s ease, max-width 0.28s ease, margin-top 0.28s ease;

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    width: ${(p) => (p.$scrolled ? "min(24vw, 110px)" : "min(30vw, 130px)")};
    max-width: ${(p) => (p.$scrolled ? "120px" : "140px")};
    margin-top: 0.1rem;
  }
`;

const MobileTop = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
`;

const ResumeFileIcon = styled(FiFileText)`
  flex-shrink: 0;
  width: 1.1rem;
  height: 1.1rem;
  color: #000;
  stroke: #000;
  stroke-width: 2.75px;
`;

const ResumeControlButton = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 0.45rem;
  padding: 12px 18px;
  cursor: pointer;
  background-color: #2e46a1;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-weight: 800;
  font-size: 0.9rem;
  filter: drop-shadow(0px 8px 10px #2e46a133);
`;

const MenuAnchor = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
`;

const MobileDropdown = styled.nav`
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 240;
  min-width: 12rem;
  max-width: min(80vw, 18rem);
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(0, 0, 0) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.55);
  visibility: ${(p) => (p.$open ? "visible" : "hidden")};
  opacity: ${(p) => (p.$open ? 1 : 0)};
  transform: ${(p) =>
    p.$open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)"};
  transform-origin: top right;
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;

  /* Small caret above the box, pointing at the menu button */
  &::before {
    content: "";
    position: absolute;
    top: -6px;
    right: 14px;
    width: 12px;
    height: 12px;
    background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(0, 0, 0) 100%);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    transform: rotate(45deg);
  }
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  text-decoration: none;
  border-radius: 7px;
  transition: background 0.15s ease;

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.07);
  }

  &:active {
    opacity: 0.85;
  }
`;

const NavDesktop = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.15rem 0.25rem;

  span {
    margin-left: clamp(0.75rem, 1.8vw, 2rem);

    &:first-child {
      margin-left: 0;
    }
  }

  a {
    color: #fff;
    text-decoration: none;
    font-weight: 400;
    position: relative;
    :hover {
      opacity: 0.7;
    }
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 12px 26px;
    margin-left: 10px;
    cursor: pointer;
    background-color: #2e46a1;
    border: none;
    border-radius: 12px;
    color: #fff;
    font-weight: 800;
    filter: drop-shadow(0px 10px 10px #2e46a133);
    :hover {
      filter: drop-shadow(0px 10px 10px #2e46a146);
    }

    svg {
      flex-shrink: 0;
      width: 1.1rem;
      height: 1.1rem;
      color: #000;
      stroke: #000;
      stroke-width: 2.75px;
    }
  }

  @media (max-width: 1024px) {
    span {
      margin-left: clamp(0.5rem, 1.2vw, 1.25rem);
    }
  }
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
`;
