import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../assets/css/mycss.css";
import "../../index.css";
import Signature from "../../assets/images/signature.png";
import { FiFileText } from "react-icons/fi";

const RESUME_PDF = `${process.env.PUBLIC_URL}/HamzaAhmedKhan_Resume.pdf`;
const MOBILE_NAV_MAX = 900;

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

  useEffect(() => {
    if (!isNarrow || !bar) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isNarrow, bar]);

  const closeMenu = () => setBar(false);

  const resumeControl = (
    <a
      id="resume-blast-anchor"
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
          id="resume-blast-anchor"
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
    <Container bar={bar}>
      <LogoBlock>
        <a href="/" onClick={closeMenu}>
          <SignatureImg src={Signature} alt="Home" />
        </a>
      </LogoBlock>

      {isNarrow ? (
        <>
          <MobileTop>
            {resumeControl}
            <MenuButton
              type="button"
              className="bars"
              aria-label={bar ? "Close menu" : "Open menu"}
              aria-expanded={bar}
              onClick={() => setBar((v) => !v)}
            >
              <div className="bar" />
            </MenuButton>
          </MobileTop>
          <MobileNavOverlay
            $open={bar}
            aria-hidden={!bar}
            onClick={closeMenu}
          >
            <MobileNavInner onClick={(e) => e.stopPropagation()}>
              {NAV_LINKS.map(({ href, label }) => (
                <MobileNavLink key={href} href={href} onClick={closeMenu}>
                  {label}
                </MobileNavLink>
              ))}
            </MobileNavInner>
          </MobileNavOverlay>
        </>
      ) : (
        <NavDesktop>{navLinks}</NavDesktop>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 0.75rem;
  max-width: 1280px;
  width: min(92%, 1280px);
  margin: 0 auto;
  padding: clamp(0.75rem, 2vw, 1.5rem) clamp(0.5rem, 2vw, 0.75rem);
  position: relative;
  z-index: 200;
  animation: header 500ms ease-in-out;

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
  width: min(50%, 200px);
  max-width: 220px;
  height: auto;
  margin-top: clamp(0.25rem, 1.5vw, 1.25rem);
  cursor: pointer;
  display: block;

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    width: min(42vw, 180px);
    max-width: 200px;
    margin-top: 0.15rem;
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

const MobileNavOverlay = styled.div`
  display: none;

  @media (max-width: ${MOBILE_NAV_MAX}px) {
    display: ${(p) => (p.$open ? "flex" : "none")};
    position: fixed;
    inset: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 15, 22, 0.92);
    backdrop-filter: blur(6px);
    z-index: 210;
    align-items: flex-start;
    justify-content: center;
    padding: clamp(5.5rem, 18vw, 7rem) clamp(1rem, 4vw, 1.5rem) 2rem;
  }
`;

const MobileNavInner = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  width: min(100%, 22rem);
  max-height: min(70vh, 520px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const MobileNavLink = styled.a`
  display: block;
  padding: 0.85rem 1rem;
  font-size: clamp(1.1rem, 3.5vw, 1.35rem);
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  background: rgba(46, 70, 161, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.12);

  &:active {
    opacity: 0.9;
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
