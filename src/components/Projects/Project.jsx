import React, { useState, useRef } from "react";
import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "../../assets/css/mycss.css";

const Project = (props) => {
  const { img, title, disc, sourceCode } = props.item;
  const { onSelect, index, onHover } = props;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const containerRef = useRef(null);

  return (
    <Container
      ref={containerRef}
      onClick={() => onSelect(index)}
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onHover && onHover(null)}
      className={`project${detailsOpen ? " details-open" : ""}`}
    >
      <Media>
        <img src={img} alt={title} />
      </Media>
      <Panel className="project-panel">
        <PanelBody className="project-panel-body">
          <SourceRow>
            <SourceButton
              href={sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              View source code
            </SourceButton>
          </SourceRow>
          <Description>{disc}</Description>
        </PanelBody>
        <PanelTitle
          type="button"
          className="project-panel-title"
          aria-expanded={detailsOpen}
          onClick={(e) => {
            e.stopPropagation();
            setDetailsOpen((open) => {
              if (open) {
                const root = containerRef.current;
                const active = document.activeElement;
                if (
                  root &&
                  active instanceof HTMLElement &&
                  root.contains(active)
                ) {
                  active.blur();
                }
              }
              return !open;
            });
          }}
        >
          <TitleLabel>{title}</TitleLabel>
          <DrawerHint aria-hidden>
            {detailsOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </DrawerHint>
        </PanelTitle>
      </Panel>
    </Container>
  );
};

export default Project;

const Container = styled.div`
  position: relative;
  height: clamp(12.5rem, 32vw, 15.5rem);
  min-height: 12.5rem;
  margin: 0 clamp(0.08rem, 0.45vw, 0.28rem);
  padding: 0;
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
  background: linear-gradient(145deg, #2a2d35 0%, #1e2128 100%);
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.45),
    0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  transition: box-shadow 0.35s ease, transform 0.35s ease;

  &:hover,
  &:focus-within {
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  &:focus-visible {
    outline: 2px solid rgba(100, 149, 237, 0.9);
    outline-offset: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:focus-within img {
    transform: scale(1.06);
  }

  @media (hover: hover) {
    &:hover img {
      transform: scale(1.06);
    }
  }

  /* Expand panel: real hover only (avoids touch sticky-hover), keyboard focus, or title tap */
  &:focus-within .project-panel,
  &.details-open .project-panel {
    max-height: 88%;
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.35);
  }

  &:focus-within .project-panel-body,
  &.details-open .project-panel-body {
    max-height: min(11.5rem, 42vh);
    opacity: 1;
    padding-top: 0.65rem;
    padding-bottom: 0.45rem;
    margin-bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  @media (hover: hover) {
    &:hover .project-panel {
      max-height: 88%;
      box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.35);
    }

    &:hover .project-panel-body {
      max-height: min(11.5rem, 42vh);
      opacity: 1;
      padding-top: 0.65rem;
      padding-bottom: 0.45rem;
      margin-bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
`;

const Media = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 14px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      transparent 42%,
      rgba(43, 65, 167, 0.28) 100%
    );
    opacity: 0.85;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  ${Container}:focus-within &::after {
    opacity: 0.55;
  }

  @media (hover: hover) {
    ${Container}:hover &::after {
      opacity: 0.55;
    }
  }
`;

const Panel = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  max-height: 3.35rem;
  overflow: hidden;
  transition: max-height 0.48s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.35s ease;
  background: linear-gradient(
    180deg,
    rgba(55, 78, 185, 0.96) 0%,
    rgba(43, 65, 167, 0.98) 40%,
    #2b41a7 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 0, 0, 0.22);
  border-radius: 14px 14px 0 0;
`;

const PanelTitle = styled.button`
  flex-shrink: 0;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.85rem 0.65rem;
  font-size: clamp(0.88rem, 1.9vw, 1rem);
  font-family: inherit;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.25;
  color: #fff;
  text-align: left;
  width: 100%;
  border: none;
  border-radius: 0;
  background: rgba(36, 54, 130, 0.92);
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.28);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.85);
    outline-offset: -2px;
  }
`;

const TitleLabel = styled.span`
  flex: 1;
  min-width: 0;
  text-align: left;
`;

const DrawerHint = styled.span`
  flex-shrink: 0;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0.88;
  font-size: 1.15rem;
  line-height: 0;
  color: rgba(255, 255, 255, 0.95);

  svg {
    display: block;
  }

  @media (hover: none), (max-width: 640px) {
    display: inline-flex;
  }
`;

const PanelBody = styled.div`
  flex: 0 1 auto;
  min-height: 0;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0 0.85rem 0;
  transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease 0.05s, padding 0.35s ease, margin 0.35s ease;

  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  overscroll-behavior-y: contain;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.28) rgba(30, 42, 110, 0.97);

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(30, 42, 110, 0.97);
    border-radius: 99px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.28);
    border-radius: 99px;
  }
`;

const Description = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.78rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.92);
  text-align: left;
  width: 100%;
`;

const SourceRow = styled.p`
  margin: 0;
  padding-bottom: 0;
  text-align: left;
`;

const SourceButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  font-size: 0.76rem;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.85);
    color: #fff;
  }
`;
