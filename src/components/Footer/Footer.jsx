import React, { useState, useCallback, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMailOpen } from "react-icons/hi";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FaRocket } from "react-icons/fa";
// import { BsFacebook } from "react-icons/bs";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import { Slide, Zoom } from "react-awesome-reveal";
import { IoLocationOutline } from "react-icons/io5";
import foot from "../../assets/images/devgif.gif";
import emailLogo from "../../assets/images/gmail.png"
import "../../assets/css/mycss.css";
import "animate.css";

/** Header resume link(s) — blast effect is centered on this control after scroll-to-top */
const RESUME_BLAST_ANCHOR_ID = "resume-blast-anchor";

/** Rocket flight + page scroll use the same duration for a synced feel */
const ROCKET_FLIGHT_MS = 1950;

/** Matches CSS animation timing below (smooth ease-in-out) */
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

/** ~ease-in-out-quart — keep scroll and rocket motion aligned */
const ROCKET_MOTION_EASING = "cubic-bezier(0.76, 0, 0.24, 1)";

/**
 * Static rocket-fly keyframe — defined once at module scope so styled-components
 * injects it eagerly. Travel distance is parameterized via the --rocket-fly-dy
 * CSS variable set on the flying-rocket element. Generating fresh keyframes per
 * launch breaks injection timing in production builds and either skips the
 * animation (no onAnimationEnd → no blast) or jumps without smooth interpolation.
 */
const flyKeyframes = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  88% {
    transform: translate3d(0, var(--rocket-fly-dy, 0px), 0) scale(0.94);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, var(--rocket-fly-dy, 0px), 0) scale(0.35);
    opacity: 0;
  }
`;

const Footer = () => {
  const footerRef = useRef(null);
  const rocketBtnRef = useRef(null);
  const footerWasVisibleRef = useRef(false);

  const [flight, setFlight] = useState(null);
  /** After a launch, hide docked rocket until user scrolls footer into view again */
  const [awaitingFooterReturn, setAwaitingFooterReturn] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [topBlast, setTopBlast] = useState(null);

  const scrollRafRef = useRef(null);
  /** Safety net: triggers handleFlyEnd even if onAnimationEnd is missed in prod */
  const flightFallbackRef = useRef(null);

  const clearFlightFallback = useCallback(() => {
    if (flightFallbackRef.current != null) {
      clearTimeout(flightFallbackRef.current);
      flightFallbackRef.current = null;
    }
  }, []);

  const cancelSmoothScroll = useCallback(() => {
    if (scrollRafRef.current != null) {
      cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    }
  }, []);

  const smoothScrollToTop = useCallback(
    (durationMs) => {
      cancelSmoothScroll();
      const startY =
        window.scrollY ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;
      if (startY <= 0) return;

      const t0 = performance.now();

      const tick = (now) => {
        const elapsed = now - t0;
        const p = Math.min(1, elapsed / durationMs);
        const y = Math.round(startY * (1 - easeInOutQuart(p)));
        window.scrollTo(0, y);
        if (p < 1) {
          scrollRafRef.current = requestAnimationFrame(tick);
        } else {
          window.scrollTo(0, 0);
          scrollRafRef.current = null;
        }
      };

      scrollRafRef.current = requestAnimationFrame(tick);
    },
    [cancelSmoothScroll]
  );

  useEffect(
    () => () => {
      cancelSmoothScroll();
      clearFlightFallback();
    },
    [cancelSmoothScroll, clearFlightFallback]
  );

  useEffect(() => {
    const el = footerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const vis =
          entry.isIntersecting && entry.intersectionRatio > 0.12;
        if (vis && !footerWasVisibleRef.current) {
          setAwaitingFooterReturn(false);
        }
        footerWasVisibleRef.current = vis;
        setFooterVisible(vis);
      },
      { threshold: [0, 0.08, 0.12, 0.2], rootMargin: "0px 0px -5% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleFlyEnd = useCallback(() => {
    clearFlightFallback();
    setFlight((current) => {
      if (!current) return null;
      const rocketSize = current.size;
      setAwaitingFooterReturn(true);

      const placeBlastBesideResume = () => {
        const anchor = document.getElementById(RESUME_BLAST_ANCHOR_ID);
        if (anchor) {
          const br = anchor.getBoundingClientRect();
          const s = Math.max(48, rocketSize, br.width, br.height);
          setTopBlast({
            top: br.top + br.height / 2 - s / 2,
            left: br.left + br.width / 2 - s / 2,
            size: s,
          });
        } else {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const fs = Math.max(48, rocketSize);
          setTopBlast({
            top: h * 0.065,
            left: w * 0.72 - fs / 2,
            size: fs,
          });
        }
        window.setTimeout(() => setTopBlast(null), 620);
      };

      /* Scroll + rocket share duration — blast the instant the flight completes */
      placeBlastBesideResume();

      return null;
    });
  }, [clearFlightFallback]);

  const launchRocket = useCallback(() => {
    const btn = rocketBtnRef.current;
    if (!btn || flight) return;

    const r = btn.getBoundingClientRect();
    const size = r.width;

    const anchor = document.getElementById(RESUME_BLAST_ANCHOR_ID);
    const ar = anchor?.getBoundingClientRect();
    const MIN_TOP = 10;

    /* Both the rocket (position: fixed during flight) and the resume anchor
       (inside the position: fixed header Shell) live in viewport coordinates,
       so dyTravel is a pure viewport delta — do NOT add window.scrollY. */
    let dyTravel;
    if (anchor && ar && ar.height > 0) {
      const resumeCenterY = ar.top + ar.height / 2;
      const rocketCenterY = r.top + size / 2;
      dyTravel = resumeCenterY - rocketCenterY;
      const minTranslate = MIN_TOP - r.top;
      dyTravel = Math.max(dyTravel, minTranslate);
    } else {
      const fallbackTop = window.innerHeight * 0.08;
      dyTravel = Math.max(fallbackTop - r.top, MIN_TOP - r.top);
    }

    setFlight({
      top: r.top,
      left: r.left,
      size,
      dyTravel,
      durationMs: ROCKET_FLIGHT_MS,
    });

    /* Safety net: if onAnimationEnd is missed (prod keyframe injection edge
       cases, tab blur, etc.), still trigger the blast so the UX completes. */
    clearFlightFallback();
    flightFallbackRef.current = window.setTimeout(
      handleFlyEnd,
      ROCKET_FLIGHT_MS + 120
    );

    smoothScrollToTop(ROCKET_FLIGHT_MS);
  }, [flight, smoothScrollToTop, clearFlightFallback, handleFlyEnd]);

  const showDockedRocket =
    footerVisible && !awaitingFooterReturn && !flight;

  return (
    <Container id="footer" ref={footerRef}>
      <ContactHeadingRow>
        <ContactTitleWrap>
          <Slide direction="left" delay={1}>
            <h1>
              Contact <span className="green">Me</span>
            </h1>
          </Slide>
        </ContactTitleWrap>
        {showDockedRocket && (
          <RocketLaunchWrap>
            <RocketButtonSlot>
              <RocketToTop
                ref={rocketBtnRef}
                type="button"
                onClick={launchRocket}
                aria-label="Scroll to top — Launch"
              >
                <BlastRing aria-hidden />
                <BlastFlash aria-hidden />
                <RocketGlyph className="rocket-svg" aria-hidden />
              </RocketToTop>
              <LaunchHint aria-hidden="true">Launch</LaunchHint>
            </RocketButtonSlot>
          </RocketLaunchWrap>
        )}
      </ContactHeadingRow>
      <Profile>
        <div className="links">
          <div>
            <Slide direction="left" style={{ paddingBottom: "5px" }}>
              <span>
                <HiOutlineMailOpen />
              </span>
            </Slide>
            <Slide>
              <p>
                <b>Email:</b> hamzaahmedkhan718@gmail.com
              </p>{" "}
              <br />
              <br />
            </Slide>
          </div>
          <div>
            <span>
              <FiPhoneCall />
            </span>
            <Slide direction="left" style={{ paddingBottom: "5px" }}>
              <p>
                <b>Contact:</b> 0300-8263067
              </p>
            </Slide>
          </div>
          <div>
            <span>
              <IoLocationOutline />
            </span>
            <Slide direction="left">
              <p>
                <b>Location:</b> Karachi, Pakistan
              </p>
            </Slide>
          </div>
        </div>
        <div className="profiles">
          <Slide direction="left">
            <br />
            <h1 className="green">Check my profiles</h1>
          </Slide>
          <div className="icons">
            <Zoom>
              <span>
                <a href="https://github.com/HamzaAhmedKhan15">
                  <AiFillGithub style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            <Zoom>
              <span>
                <a href="https://www.linkedin.com/in/hamza-ahmed-khan-/">
                  <AiFillLinkedin style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            {/* Facebook
            <Zoom>
              <span>
                <a href="https://www.facebook.com/profile.php?id=100007366266108">
                  <BsFacebook style={{ fontSize: "1.5rem" }} />
                </a>
              </span>
            </Zoom>
            */}
            <button className="button-container2">
  <a
    href="https://mail.google.com/mail/?view=cm&to=hamzaahmedkhan718@gmail.com"
    target="_blank"
    rel="noopener noreferrer"
    style={{ display: 'flex', alignItems: 'center' }} // Optional, for better alignment
  >
    Send Email

    <img
      src={emailLogo}
      alt="Email Logo"
      style={{ width: '20px', height: '20px', marginLeft: '8px' }} // Adjust size and spacing as needed
    />
  </a>
</button>

          </div>
        </div>
      </Profile>
      <Form>
        <MediaQueryWrapper>
          <FooterGif src={foot} alt="" />
        </MediaQueryWrapper>
      </Form>

      {flight && (
        <FlyingRocketFlightWrap
          $top={flight.top}
          $left={flight.left}
          $size={flight.size}
          $durationMs={flight.durationMs ?? ROCKET_FLIGHT_MS}
          style={{ "--rocket-fly-dy": `${flight.dyTravel}px` }}
          onAnimationEnd={(e) => {
            if (e.target === e.currentTarget) handleFlyEnd();
          }}
        >
          <FlyingRocketCircle>
            <FlyingRocketInner>
              <FaRocket aria-hidden />
            </FlyingRocketInner>
          </FlyingRocketCircle>
          <RocketSmokeTrail aria-hidden>
            <SmokePuff $delay={0} $x={-2} />
            <SmokePuff $delay={0.1} $x={2} />
            <SmokePuff $delay={0.2} $x={-3} />
            <SmokePuff $delay={0.3} $x={3} />
            <SmokePuff $delay={0.4} $x={-1} />
            <SmokePuff $delay={0.5} $x={0} />
          </RocketSmokeTrail>
        </FlyingRocketFlightWrap>
      )}

      {topBlast && (
        <TopBlastAnchor
          style={{
            top: topBlast.top,
            left: topBlast.left,
            width: topBlast.size,
            height: topBlast.size,
          }}
        >
          <BlastRing aria-hidden />
          <BlastFlash aria-hidden />
        </TopBlastAnchor>
      )}
    </Container>
  );
};

export default Footer;

// Example of a component with media query

// Styled component for media query
const MediaQueryWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 0;
`;

const FooterGif = styled.img`
  width: clamp(170px, 28vw, 400px);
  max-width: 100%;
  height: auto;
  display: block;
  /* GIFs can't carry true alpha — blend the dark navy backdrop into the
     footer's dark bg so only the brighter monitor/character/hands read. */
  mix-blend-mode: lighten;
  isolation: isolate;

  @media (max-width: 650px) {
    width: min(80%, 280px);
  }
`;

const ContactHeadingRow = styled.div`
  flex: 1 1 100%;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: clamp(0.5rem, 2vw, 1rem);
  min-width: 0;
  box-sizing: border-box;
  margin-bottom: clamp(0.75rem, 2vw, 1.25rem);

  h1 {
    margin: 0;
    line-height: 1.2;
  }
`;

const ContactTitleWrap = styled.div`
  flex: 1;
  min-width: 0;
`;

const Container = styled.div`
  position: relative;
  padding: clamp(1.5rem, 4vw, 2rem) clamp(0.75rem, 3vw, 1.25rem);
  padding-bottom: clamp(3.5rem, 8vw, 5rem);
  width: min(94%, 1280px);
  max-width: 1280px;
  margin: 2rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: clamp(1rem, 3vw, 2rem);
  box-sizing: border-box;
  @media (max-width: 840px) {
    width: min(96%, 1280px);
  }

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 2.5rem;
    padding-bottom: clamp(4.5rem, 12vw, 6rem);
  }
`;
const Profile = styled.div`
  flex: 1;
  min-width: 0;

  .links {
    h1 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }

    div {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 0.5rem;
      a {
        text-decoration: none;
        color: lightgray;
        padding: 5px;
        :hover {
          color: #01be96;
        }
      }
    }

    p {
      overflow-wrap: anywhere;
      word-break: break-word;
      max-width: 100%;
    }
  }

  .profiles {
    h1 {
      font-size: 1.2rem;
      padding: 1rem 0;
    }

    .icons {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: 50px;

        :hover {
          background-color: #2e46a1;
        }

        a {
          margin-top: 0.2rem;
          color: #fff;
        }
      }

      /* Mobile: keep Send Email inline with the icons (overrides the global
         .button-container2 rule that forces it to width: 100% on small screens). */
      @media (max-width: 650px) {
        .button-container2 {
          width: auto;
          max-width: none;
          margin-left: 0;
          padding: 8px 14px;
          flex: 0 0 auto;
          white-space: nowrap;
        }
      }
    }
  }
`;
const ArrowUp = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #2e46a1;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  border-radius: 50%;
  flex-shrink: 0;
  @media (max-width: 650px) {
    position: fixed;
    right: clamp(0.75rem, 3vw, 1.25rem);
    bottom: clamp(0.75rem, 3vw, 1.25rem);
    top: auto;
    margin-top: 0;
    z-index: 90;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
  }
`;
const Form = styled.div`
  flex: 1;
  min-width: 0;
  width: 100%;
  max-width: min(100%, 520px);
  margin-inline: auto;
  display: flex;
  justify-content: center;

  /* Tablet+ : lift the GIF up to sit on the same horizontal line as the
     "Contact Me" heading, anchored to the top-right of the footer container.
     The 'top' value mirrors Container's padding-top so the GIF's top edge
     aligns with the heading. Right offset leaves room for the docked rocket. */
  @media (min-width: 651px) {
    position: absolute;
    top: clamp(1.5rem, 4vw, 2rem);
    right: clamp(6rem, 10vw, 9rem);
    flex: 0 0 auto;
    width: auto;
    max-width: none;
    margin: 0;
    z-index: 1;
    pointer-events: none;
  }
  h1 {
    font-size: 1.3rem;
    padding-bottom: 0.7rem;
  }

  form {
    background-color: #191923;
    padding: 0.8rem;
    border-radius: 5px;
    .name,
    .email,
    .message {
      display: flex;
      border: 1px solid gray;
      margin-bottom: 0.5rem;
      input,
      textarea {
        width: 100%;
        border: none;
        outline: none;
        color: #fff;
        background-color: transparent;
        padding: 1rem 0.5rem;
      }
      span {
        background-color: #3e3e3e;
        width: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .messageIcon {
        align-items: flex-start;
        padding-top: 0.5rem;
      }
    }

    button {
      width: 8rem;
      height: 1.8rem;
      background-color: #2e46a1;
      color: white;
      border: none;
      border-radius: 5px;
      filter: drop-shadow(0px 4px 5px #2e46a133);
      cursor: pointer;
      :hover {
        filter: drop-shadow(0px 6px 9px #2e46a146);
      }
    }
  }
`;

const smokeBillow = keyframes`
  0% {
    opacity: 0.88;
    transform: translate(-50%, 0) scale(0.5);
  }
  35% {
    opacity: 0.55;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, 18px) scale(1.35);
  }
`;

const ringExpand = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.2);
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(3.2);
    opacity: 0;
  }
`;

const flashPop = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.45);
  }
  22% {
    opacity: 0.88;
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.35);
  }
`;

const RocketGlyph = styled(FaRocket)`
  position: relative;
  z-index: 2;
  font-size: 1.2rem;
  display: block;
  /* FA rocket glyph points ~45° — rotate so nose aims straight up */
  transform: rotate(-45deg);
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
`;

const BlastRing = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(196, 181, 253, 0.95);
  box-sizing: border-box;
  box-shadow: 0 0 14px rgba(124, 58, 237, 0.45);
  transform: translate(-50%, -50%) scale(0.2);
  opacity: 0;
  pointer-events: none;
  z-index: 0;
`;

const BlastFlash = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 160%;
  height: 160%;
  transform: translate(-50%, -50%) scale(0.45);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(237, 233, 254, 0.92) 0%,
    rgba(167, 139, 250, 0.55) 38%,
    rgba(46, 70, 161, 0.35) 58%,
    transparent 72%
  );
  opacity: 0;
  pointer-events: none;
  z-index: 1;
`;

const RocketSmokeTrail = styled.div`
  flex-shrink: 0;
  position: relative;
  width: calc(var(--rocket-size, 48px) * 0.72);
  height: calc(var(--rocket-size, 48px) * 0.48);
  margin-top: calc(var(--rocket-size, 48px) * -0.16);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 0.35) 100%
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.92) 0%,
    rgba(0, 0, 0, 1) 45%,
    rgba(0, 0, 0, 0.35) 100%
  );

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const SmokePuff = styled.div`
  position: absolute;
  left: calc(50% + ${(p) => p.$x ?? 0}px);
  top: 0;
  width: calc(var(--rocket-size, 48px) * 0.38);
  height: calc(var(--rocket-size, 48px) * 0.38);
  min-width: 16px;
  min-height: 16px;
  border-radius: 50%;
  transform: translate(-50%, 0);
  background: radial-gradient(
    circle at 45% 38%,
    rgba(195, 198, 206, 0.75) 0%,
    rgba(130, 135, 145, 0.5) 38%,
    rgba(88, 92, 100, 0.32) 58%,
    rgba(55, 58, 64, 0.12) 75%,
    transparent 85%
  );
  box-shadow: 0 3px 10px rgba(45, 48, 54, 0.35);
  filter: blur(2.5px);
  -webkit-filter: blur(2.5px);
  opacity: 0;
  animation: ${smokeBillow} 0.5s ease-out infinite;
  animation-delay: ${(p) => `${p.$delay ?? 0}s`};
  will-change: transform, opacity;

  &:nth-child(even) {
    width: calc(var(--rocket-size, 48px) * 0.32);
    height: calc(var(--rocket-size, 48px) * 0.32);
    filter: blur(3px);
    -webkit-filter: blur(3px);
  }
`;

const FlyingRocketFlightWrap = styled.div`
  --rocket-size: ${(p) => p.$size}px;
  position: fixed;
  z-index: 200;
  pointer-events: none;
  top: ${(p) => p.$top}px;
  left: ${(p) => p.$left}px;
  width: ${(p) => p.$size}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  animation: ${flyKeyframes} ${(p) => p.$durationMs ?? ROCKET_FLIGHT_MS}ms
    ${ROCKET_MOTION_EASING} forwards;
`;

const FlyingRocketCircle = styled.div`
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: var(--rocket-size);
  height: var(--rocket-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #3a56c4 0%, #2e46a1 55%, #243a88 100%);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
`;

const FlyingRocketInner = styled.div`
  position: relative;
  flex: 0 0 auto;
  width: auto;
  height: auto;
  color: #fff;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
  transform: rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  svg {
    font-size: 1.2rem;
    display: block;
  }
`;

const TopBlastAnchor = styled.div`
  position: fixed;
  z-index: 199;
  pointer-events: none;
  box-sizing: border-box;
  transform: translateZ(0);

  ${BlastRing} {
    animation: ${ringExpand} 0.52s ease-out forwards;
  }

  ${BlastFlash} {
    animation: ${flashPop} 0.48s ease-out forwards;
  }
`;

const LaunchHint = styled.span`
  position: absolute;
  /* Anchor to 3rem button — extra gap between label + arrow and the rocket */
  right: calc(100% + 0.85rem);
  top: 50%;
  transform: translateY(-50%) translateX(5px);
  opacity: 0;
  pointer-events: none;
  z-index: 6;
  padding: 0.36rem 0.55rem 0.36rem 0.65rem;
  border-radius: 11px;
  white-space: nowrap;
  font-family: "Bricolage Grotesque", "Poppins", system-ui, sans-serif;
  font-size: clamp(0.68rem, 2.2vw, 0.8rem);
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #f4f2ff;
  background: linear-gradient(148deg, #3f54cc 0%, #2e46a1 48%, #243a88 100%);
  border: 1px solid rgba(196, 181, 253, 0.42);
  box-shadow:
    0 5px 18px rgba(36, 58, 136, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.07) inset,
    0 0 20px rgba(124, 58, 237, 0.18);
  transition: opacity 0.22s ease, transform 0.22s ease;

  /* Triangle arrow pointing right toward the rocket */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: calc(100% - 1px);
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 0 6px 7px;
    border-color: transparent transparent transparent #3a4fc4;
    filter: drop-shadow(1px 0 2px rgba(36, 58, 136, 0.4));
  }

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.15s ease;
  }
`;

const RocketButtonSlot = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 3rem;
  height: 3rem;
`;

const RocketLaunchWrap = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  align-self: center;
  align-items: center;
  /* Hover target extends left over “LAUNCH” so it doesn’t flicker off */
  padding-left: 3.85rem;
  margin-left: -3.85rem;

  &:hover ${LaunchHint} {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover ${LaunchHint} {
      transform: translateY(-50%);
    }
  }
`;

const RocketToTop = styled.button`
  flex-shrink: 0;
  align-self: center;
  z-index: 5;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(145deg, #3a56c4 0%, #2e46a1 55%, #243a88 100%);
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(46, 70, 161, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    filter: brightness(1.06);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: default;
    filter: grayscale(0.08);
  }
`;
