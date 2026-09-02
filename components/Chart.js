'use client';
import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="stat-card-title">Weekly Revenue</div>
          <div className="menu-wrapper">
            <input className="menu-toggle" id="menu-toggle" type="checkbox" />
            <label className="menu-dots" htmlFor="menu-toggle">
              <span />
              <span />
              <span />
            </label>
            <div className="menu-select">
              <div>View</div>
              <div>Edit</div>
              <div>Delete</div>
            </div>
          </div>
        </div>
        <div className="stat-card-chart">
          <svg className="linechart" viewBox="0 0 360 120">
            <defs>
              <linearGradient y2={1} x2={0} y1={0} x1={0} id="lineGradient">
                <stop stopColor="#FF6B35" offset="0%" />
                <stop stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
              <linearGradient y2={1} x2={0} y1={0} x1={0} id="areaGradient">
                <stop stopOpacity="0.3" stopColor="#FF6B35" offset="0%" />
                <stop stopOpacity={0} stopColor="#FFFFFF" offset="100%" />
              </linearGradient>
              <filter height="140%" width="140%" y="-20%" x="-20%" id="glow">
                <feGaussianBlur result="coloredBlur" stdDeviation={3} />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path fill="url(#areaGradient)" d="M15,90 L65,40 L115,60 L165,35 L215,60 L265,80 L315,60 L315,120 L15,120 Z" />
            <polyline filter="url(#glow)" points="15,90 65,40 115,60 165,35 215,60 265,80 315,60" strokeWidth={4} stroke="url(#lineGradient)" fill="none" />
            
            {[
              { label: 'Mon', val: 12, x: 15, cy: 90 },
              { label: 'Tue', val: 40, x: 65, cy: 40 },
              { label: 'Wed', val: 28, x: 115, cy: 60 },
              { label: 'Thu', val: 50, x: 165, cy: 35 },
              { label: 'Fri', val: 30, x: 215, cy: 60 },
              { label: 'Sat', val: 18, x: 265, cy: 80 },
              { label: 'Sun', val: 22, x: 315, cy: 60 }
            ].map((d, i) => (
              <g className="dot-group" key={i}>
                <circle fill="#FF6B35" r={6} cy={d.cy} cx={d.x} />
                <g className="tooltip">
                  <rect opacity="0.92" fill="#232733" rx={8} height={32} width={70} y={d.cy - 40} x={d.x - 35} />
                  <text fontWeight={500} fontSize={15} fill="#fff" textAnchor="middle" y={d.cy - 20} x={d.x}>
                    {d.label}: {d.val}
                  </text>
                </g>
              </g>
            ))}
            
            <g fill="#b0b6c3" fontSize={12} className="x-labels">
              <text textAnchor="middle" y={115} x={15}>Mon</text>
              <text textAnchor="middle" y={115} x={65}>Tue</text>
              <text textAnchor="middle" y={115} x={115}>Wed</text>
              <text textAnchor="middle" y={115} x={165}>Thu</text>
              <text textAnchor="middle" y={115} x={215}>Fri</text>
              <text textAnchor="middle" y={115} x={265}>Sat</text>
              <text textAnchor="middle" y={115} x={315}>Sun</text>
            </g>
          </svg>
        </div>
        <div className="stat-card-legend">
          <div className="legend-item">
            <span>Average weekly sale for every author</span>
          </div>
          <div className="legend-item">
            <span className="legend-value">68.9%</span>
            <span className="legend-change">▲ 34.5%</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .stat-card {
    background: #232733;
    border-radius: 18px;
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.18);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    width: 340px;
    color: #f3f6fa;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .stat-card-header { display: flex; justify-content: space-between; align-items: center; }
  .stat-card-title {
    font-family: "Inter", sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: #f3f6fa;
    letter-spacing: 0.01em;
    background: linear-gradient(90deg, #fff 0%, #f3f6fa 50%, #e3e8ef 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .stat-card-chart { display: flex; justify-content: center; align-items: center; }
  .linechart { width: 100%; max-width: 360px; height: 120px; display: block; }
  .linechart .x-labels text { font-family: "Inter", sans-serif; font-size: 12px; fill: #b0b6c3; }
  .dot-group .tooltip { opacity: 0; pointer-events: none; transition: opacity 0.2s; }
  .dot-group:hover .tooltip { opacity: 1; }
  .dot-group .tooltip rect { fill: #232733; stroke: #FF6B35; stroke-width: 1.2; rx: 8; opacity: 0.92; }
  .dot-group .tooltip text { font-family: "Inter", sans-serif; font-size: 15px; font-weight: 500; fill: #fff; }
  .menu-wrapper { position: relative; display: inline-block; }
  .menu-dots { display: flex; flex-direction: column; gap: 3px; cursor: pointer; width: 18px; align-items: center; }
  .menu-dots span { display: block; width: 5px; height: 5px; background: #6c7383; border-radius: 50%; }
  .menu-toggle { display: none; }
  .menu-select {
    display: none; position: absolute; right: 0; top: 30px; min-width: 110px; z-index: 10; padding: 8px 0;
    border-radius: 18px; border: 1.5px solid rgba(80, 90, 120, 0.18); background: rgba(30, 34, 44, 0.72);
    backdrop-filter: blur(8px); opacity: 0; pointer-events: none;
  }
  .menu-toggle:checked + .menu-dots + .menu-select { display: block; opacity: 1; pointer-events: auto; }
  .menu-select div { padding: 10px 20px; color: #f3f6fa; cursor: pointer; font-family: "Inter", sans-serif; border-left: 3px solid transparent; }
  .menu-select div:hover { background: rgba(255, 107, 53, 0.08); color: #FF6B35; border-left: 3px solid #FF6B35; }
  .stat-card-legend { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.6rem; }
  .legend-item { display: flex; align-items: center; justify-content: space-between; font-size: 1rem; color: #b0b6c3; }
  .legend-value { font-size: 2rem; color: #FF6B35; font-weight: 600; }
  .legend-change { color: #1ecb6b; font-weight: 600; }
`;

export default Card;