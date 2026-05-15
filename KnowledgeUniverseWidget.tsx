/**
 * KnowledgeUniverse — 全屏震撼宇宙场景组件
 *
 * 左侧：Hero 文案 + 按钮 + 数据统计
 * 右侧：大型 3D 知识宇宙（中心星球 + 6 颗环绕行星 + 宇航员 + 星空）
 *
 * 用法：
 *   import KnowledgeUniverse from './KnowledgeUniverseWidget';
 *   <KnowledgeUniverse />
 *
 * Props（均为可选）:
 *   nodes       — 自定义节点数据
 *   onNodeClick — 点击节点回调 (nodeId: string) => void
 */

import React, { useState, useEffect, useCallback, useRef, useMemo, CSSProperties } from 'react';

/* ── 类型 ──────────────────────────────────────────────────── */

export interface NodeData {
  id: string;
  label: string;
  description: string;
  color: string;
  glowColor: string;
  orbitRadius: number;
  speed: number;
  tilt: number;
  startAngle: number;
  size: number;
  learningPath: string[];
}

interface Props {
  nodes?: NodeData[];
  onNodeClick?: (nodeId: string) => void;
}

/* ── 默认数据 ──────────────────────────────────────────────── */

const DEFAULT_NODES: NodeData[] = [
  { id:'math',    label:'数学思维', color:'#7c8cf8', glowColor:'rgba(124,140,248,0.4)',  orbitRadius:210, speed:0.14, tilt:-12, startAngle:30,  size:48, description:'从基础算术到高等数学，培养逻辑推理与抽象思维能力', learningPath:['代数基础','几何直观','逻辑推理','综合应用'] },
  { id:'code',    label:'编程实践', color:'#a78bfa', glowColor:'rgba(167,139,250,0.4)',  orbitRadius:270, speed:0.11, tilt:8,   startAngle:100, size:52, description:'掌握Python、JavaScript等编程语言，从零开始构建项目', learningPath:['语法入门','项目实战','算法进阶','全栈开发'] },
  { id:'ai',      label:'AI辅导',   color:'#c084fc', glowColor:'rgba(192,132,252,0.4)',  orbitRadius:180, speed:0.17, tilt:-6,  startAngle:200, size:44, description:'智能学习助手，个性化推荐学习路径，随时提问即时解答', learningPath:['基础认知','互动学习','深度探索','创造应用'] },
  { id:'lang',    label:'语言学习', color:'#818cf8', glowColor:'rgba(129,140,248,0.4)',  orbitRadius:300, speed:0.09, tilt:5,   startAngle:310, size:50, description:'沉浸式语言环境，AI对话陪练，全方位提升听说读写', learningPath:['词汇积累','语法精通','口语突破','文化理解'] },
  { id:'science', label:'科学探索', color:'#22d3ee', glowColor:'rgba(34,211,238,0.4)',   orbitRadius:240, speed:0.12, tilt:-10, startAngle:160, size:46, description:'虚拟实验室、科学纪录片、动手实验，点燃好奇心', learningPath:['观察发现','实验验证','理论建构','创新实践'] },
  { id:'culture', label:'人文素养', color:'#60a5fa', glowColor:'rgba(96,165,250,0.4)',   orbitRadius:280, speed:0.10, tilt:12,  startAngle:260, size:42, description:'经典名著导读、历史脉络梳理、艺术鉴赏', learningPath:['经典阅读','历史思维','艺术感知','批判思考'] },
];

/* ── 全局样式注入 ───────────────────────────────────────────── */

const STYLE_ID = 'ku-global-styles';
function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = `
    @keyframes kuCorePulse { 0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(1)} 50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)} }
    @keyframes kuGridSpin { to{transform:rotate(360deg)} }
    @keyframes kuStarTwinkle { 0%,100%{opacity:var(--omin);transform:scale(.7)} 50%{opacity:var(--omax);transform:scale(1.3)} }
    @keyframes kuAstroFloat { 0%,100%{transform:translateY(0) rotate(-2deg)} 50%{transform:translateY(-18px) rotate(2deg)} }
    @keyframes kuDotPulse { 0%,100%{box-shadow:0 0 8px rgba(96,165,250,.8),0 0 18px rgba(96,165,250,.3)} 50%{box-shadow:0 0 14px rgba(96,165,250,1),0 0 28px rgba(96,165,250,.5)} }
    @keyframes kuPulse { 0%,100%{opacity:1;box-shadow:0 0 8px #34d399} 50%{opacity:.45;box-shadow:0 0 3px #34d399} }
    @keyframes kuTipIn { from{opacity:0;transform:translateX(-50%) translateY(4px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
    @keyframes kuPanelClose { from{transform:rotate(0)} to{transform:rotate(90deg)} }
  `;
  document.head.appendChild(s);
}

/* ── 组件 ──────────────────────────────────────────────────── */

const KnowledgeUniverse: React.FC<Props> = ({ nodes = DEFAULT_NODES, onNodeClick }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);

  const anglesRef = useRef(nodes.map(n => n.startAngle));
  const planetElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cosmosRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  // 注入样式
  useEffect(() => { injectStyles(); }, []);

  // 星点
  const stars = useMemo(() =>
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.3,
      minO: (Math.random() * 0.08 + 0.03).toFixed(2),
      maxO: (Math.random() * 0.5 + 0.25).toFixed(2),
      dur: (2.5 + Math.random() * 4).toFixed(1),
      delay: (Math.random() * 5).toFixed(1),
    })), []);

  // 轨道动画
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const cosmos = cosmosRef.current;
      const core = coreRef.current;
      if (!cosmos || !core) { raf = requestAnimationFrame(tick); return; }

      const cs = cosmos.getBoundingClientRect();
      const cr = core.getBoundingClientRect();
      const cx = cr.left + cr.width / 2 - cs.left;
      const cy = cr.top + cr.height / 2 - cs.top;

      nodes.forEach((p, i) => {
        anglesRef.current[i] += p.speed;
        const rad = (anglesRef.current[i] * Math.PI) / 180;
        const tiltRad = (p.tilt * Math.PI) / 180;
        const rawX = p.orbitRadius * Math.cos(rad);
        const rawY = p.orbitRadius * 0.48 * Math.sin(rad);
        const x = rawX * Math.cos(tiltRad) - rawY * Math.sin(tiltRad);
        const y = rawX * Math.sin(tiltRad) + rawY * Math.cos(tiltRad);

        const el = planetElsRef.current[i];
        if (!el) return;

        const depth = Math.sin(rad);
        el.style.left = (cx + x - p.size / 2) + 'px';
        el.style.top = (cy + y - p.size / 2) + 'px';
        el.style.zIndex = String(depth > 0 ? 30 + Math.round(depth * 10) : 5 + Math.round(depth * 5));
        el.style.opacity = String(0.6 + 0.4 * (depth * 0.5 + 0.5));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [nodes]);

  const openPanel = useCallback((idx: number) => {
    setSelectedPlanet(idx);
    setPanelOpen(true);
    onNodeClick?.(nodes[idx].id);
  }, [nodes, onNodeClick]);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setTimeout(() => setSelectedPlanet(null), 500);
  }, []);

  const selected = selectedPlanet !== null ? nodes[selectedPlanet] : null;

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#050a18' } as CSSProperties}>
      {/* ── 导航栏 ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500, height: 56,
        display: 'flex', alignItems: 'center', padding: '0 36px',
        background: 'rgba(5,8,20,0.85)', borderBottom: '1px solid rgba(80,140,255,0.06)',
        backdropFilter: 'blur(16px)',
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 17, fontWeight: 700, color: '#e8f0fe' }}>
          <span style={{ width: 30, height: 30, borderRadius: 9, background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#fff', boxShadow: '0 2px 10px rgba(59,130,246,0.35)' }}>✦</span>
          EduMind
        </span>
      </nav>

      {/* ── Hero ── */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex' } as CSSProperties}>
        {/* 左侧内容 */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 72px', maxWidth: '46%', display: 'flex', flexDirection: 'column', justifyContent: 'center' } as CSSProperties}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 18px', borderRadius: 24, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', fontSize: 12, fontWeight: 500, color: '#60a5fa', marginBottom: 32, width: 'fit-content' } as CSSProperties}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399', animation: 'kuPulse 2.5s ease infinite' }} />
            AI × 教育 让学习更高效
          </div>
          <h1 style={{ fontSize: 'clamp(36px,4.2vw,56px)', fontWeight: 900, lineHeight: 1.15, color: '#f0f9ff', marginBottom: 22, letterSpacing: -0.5 }}>
            AI 知识宇宙<br />
            <span style={{ background: 'linear-gradient(135deg,#818cf8,#c084fc,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' } as CSSProperties}>
              成就无限可能
            </span>
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(180,200,240,0.5)', marginBottom: 40, fontWeight: 300 }}>
            AI 驱动的个性化学习平台，连接优质内容与先进技术，<br />激发每一个学习者的潜能，面向未来，全面成长。
          </p>
          <div style={{ display: 'flex', gap: 14, marginBottom: 52 } as CSSProperties}>
            <button style={{ padding: '13px 30px', borderRadius: 13, border: 'none', background: 'linear-gradient(135deg,#3b82f6,#7c3aed)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 24px rgba(59,130,246,0.35)' }}>开始免费学习 →</button>
            <button style={{ padding: '13px 30px', borderRadius: 13, border: '1px solid rgba(100,160,255,0.15)', background: 'rgba(255,255,255,0.02)', color: '#e0f2fe', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>了解平台优势 ↗</button>
          </div>
          <div style={{ display: 'flex', gap: 0, padding: '26px 32px', borderRadius: 18, background: 'rgba(6,10,28,0.5)', border: '1px solid rgba(80,140,255,0.06)', backdropFilter: 'blur(12px)' } as CSSProperties}>
            {[
              { n: '150万+', l: '活跃学习者' },
              { n: '3000+', l: '精品课程' },
              { n: '98.7%', l: '学习效果提升' },
              { n: '1000+', l: '合作机构' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' } as CSSProperties}>
                <div style={{ fontSize: 26, fontWeight: 900, background: 'linear-gradient(135deg,#60a5fa,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: 'rgba(120,155,210,0.4)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧宇宙 */}
        <div ref={cosmosRef} style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', overflow: 'hidden' } as CSSProperties}>
          {/* 星点 */}
          {stars.map((s, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size,
              borderRadius: '50%', background: '#c8ddf5',
              ['--omin' as string]: s.minO, ['--omax' as string]: s.maxO,
              animation: `kuStarTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }} />
          ))}

          {/* 地球弧线 */}
          <div style={{ position: 'absolute', bottom: -60, left: '50%', transform: 'translateX(-50%)', width: '140%', height: 340, background: 'radial-gradient(ellipse 70% 100% at 50% 100%,rgba(30,100,220,0.12) 0%,rgba(20,60,160,0.04) 40%,transparent 70%)', borderRadius: '50% 50% 0 0', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 140, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg,transparent 5%,rgba(80,160,255,0.15) 25%,rgba(120,200,255,0.25) 50%,rgba(80,160,255,0.15) 75%,transparent 95%)' }} />

          {/* 中心球 */}
          <div ref={coreRef} style={{ position: 'absolute', top: '42%', left: '56%', transform: 'translate(-50%,-50%)', zIndex: 20 } as CSSProperties}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle,rgba(60,140,255,0.3) 0%,rgba(40,100,220,0.1) 30%,transparent 70%)', animation: 'kuCorePulse 4s ease-in-out infinite', pointerEvents: 'none' }} />
            <div style={{ width: 380, height: 380, borderRadius: '50%', position: 'relative', overflow: 'hidden', background: 'radial-gradient(circle at 34% 30%,#bae6fd,#60a5fa 18%,#3b82f6 32%,#2563eb 48%,#1d4ed8 62%,#1e40af 78%,#1e3a8a 100%)', boxShadow: '0 0 60px rgba(59,130,246,0.5),0 0 120px rgba(59,130,246,0.25),0 0 200px rgba(59,130,246,0.1),inset 0 -20px 40px rgba(0,0,0,0.3)' }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'repeating-linear-gradient(0deg,transparent,transparent 18px,rgba(255,255,255,0.06) 18px,rgba(255,255,255,0.06) 19px),repeating-linear-gradient(90deg,transparent,transparent 18px,rgba(255,255,255,0.04) 18px,rgba(255,255,255,0.04) 19px)', animation: 'kuGridSpin 80s linear infinite' }} />
              <div style={{ position: 'absolute', top: '8%', left: '12%', width: '35%', height: '28%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.45),transparent)' }} />
              <div style={{ position: 'absolute', inset: -2, borderRadius: '50%', border: '2px solid rgba(100,180,255,0.1)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', zIndex: 5, pointerEvents: 'none' }}>
                <h2 style={{ fontSize: 44, fontWeight: 900, color: '#fff', textShadow: '0 0 40px rgba(120,200,255,0.7)', letterSpacing: 6, whiteSpace: 'nowrap', margin: 0 }}>知识宇宙</h2>
                <p style={{ fontSize: 15, color: 'rgba(200,230,255,0.7)', marginTop: 8, letterSpacing: 6, textShadow: '0 0 20px rgba(100,180,255,0.4)', whiteSpace: 'nowrap' }}>连接 · 探索 · 成长</p>
              </div>
            </div>
          </div>

          {/* 轨道环 */}
          {nodes.map((p, i) => (
            <div key={i} style={{ position: 'absolute', top: '42%', left: '56%', width: p.orbitRadius * 2, height: p.orbitRadius, borderRadius: '50%', border: '1px solid rgba(100,180,255,0.07)', transform: `translate(-50%,-50%) rotate(${p.tilt}deg)`, pointerEvents: 'none', zIndex: 3 + i } as CSSProperties} />
          ))}

          {/* 行星 */}
          {nodes.map((p, i) => (
            <div
              key={p.id}
              ref={el => { planetElsRef.current[i] = el; }}
              style={{
                position: 'absolute', cursor: 'pointer',
                transition: 'filter 0.3s',
                filter: hoveredPlanet === p.id ? `brightness(1.3) drop-shadow(0 0 12px ${p.glowColor})` : 'none',
              } as CSSProperties}
              onMouseEnter={() => setHoveredPlanet(p.id)}
              onMouseLeave={() => setHoveredPlanet(null)}
              onClick={() => openPanel(i)}
            >
              <div style={{ width: p.size, height: p.size, borderRadius: '50%', position: 'relative', overflow: 'hidden', background: `radial-gradient(circle at 34% 30%,${p.color},${p.color}bb 65%,${p.color}66 100%)`, boxShadow: `0 0 ${p.size * 0.3}px ${p.glowColor},0 0 ${p.size * 0.6}px ${p.glowColor.replace('0.4', '0.15')}` }}>
                <div style={{ position: 'absolute', top: '15%', left: '18%', width: '35%', height: '30%', borderRadius: '50%', background: 'radial-gradient(ellipse,rgba(255,255,255,0.4),transparent)' }} />
              </div>
              {/* 标签 */}
              <div style={{
                position: 'absolute', top: '50%', left: `calc(100% + 10px)`, transform: 'translateY(-50%)',
                padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, color: '#e0f2fe',
                background: 'rgba(10,16,36,0.75)', border: '1px solid rgba(100,180,255,0.18)',
                backdropFilter: 'blur(10px)', whiteSpace: 'nowrap',
                opacity: hoveredPlanet === p.id ? 1 : 0.85,
                transition: 'opacity 0.3s',
              } as CSSProperties}>
                {p.label}
              </div>
              {/* Tooltip */}
              {hoveredPlanet === p.id && (
                <div style={{
                  position: 'absolute', bottom: 'calc(100% + 14px)', left: '50%', transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap', padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 500,
                  background: 'rgba(6,10,28,0.95)', border: `1px solid ${p.glowColor.replace('0.4', '0.3')}`,
                  color: p.color, boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(12px)', animation: 'kuTipIn 0.25s ease-out',
                } as CSSProperties}>
                  <strong style={{ color: p.color, marginRight: 6 }}>{p.label}</strong>
                  <span style={{ color: 'rgba(180,200,240,0.6)' }}>{p.description.slice(0, 16)}…</span>
                </div>
              )}
            </div>
          ))}

          {/* 宇航员 */}
          <div style={{ position: 'absolute', bottom: '10%', left: '48%', zIndex: 25, animation: 'kuAstroFloat 7s ease-in-out infinite', opacity: 0.7, pointerEvents: 'none' }}>
            <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
              <rect x="56" y="32" width="12" height="22" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="1"/>
              <ellipse cx="38" cy="28" rx="19" ry="21" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5"/>
              <ellipse cx="38" cy="26" rx="13" ry="14" fill="#0c1929" stroke="#60a5fa" strokeWidth="1.2" opacity=".9"/>
              <ellipse cx="33" cy="22" rx="4" ry="3" fill="rgba(147,197,253,0.35)" transform="rotate(-15,33,22)"/>
              <ellipse cx="38" cy="10" rx="4" ry="2.5" fill="#9ca3af"/>
              <circle cx="38" cy="9" r="1.5" fill="#60a5fa" opacity=".7"/>
              <path d="M24 48 Q24 44 30 42 L46 42 Q52 44 52 48 L52 68 Q52 72 48 72 L28 72 Q24 72 24 68Z" fill="#6b7280" stroke="#4b5563" strokeWidth="1"/>
              <rect x="30" y="48" width="16" height="10" rx="3" fill="#374151"/>
              <circle cx="34" cy="53" r="2" fill="#3b82f6" opacity=".6"/>
              <circle cx="42" cy="53" r="1.5" fill="#34d399" opacity=".5"/>
              <rect x="26" y="66" width="24" height="4" rx="2" fill="#374151"/>
              <path d="M24 46 L16 54 Q14 58 16 62 L18 60 Q20 56 22 52Z" fill="#6b7280" stroke="#4b5563" strokeWidth="1"/>
              <path d="M52 46 L60 54 Q62 58 60 62 L58 60 Q56 56 54 52Z" fill="#6b7280" stroke="#4b5563" strokeWidth="1"/>
              <rect x="27" y="72" width="9" height="20" rx="4" fill="#374151"/>
              <rect x="40" y="72" width="9" height="18" rx="4" fill="#374151"/>
              <ellipse cx="31" cy="94" rx="6" ry="4" fill="#1f2937"/>
              <ellipse cx="44" cy="92" rx="5.5" ry="3.5" fill="#1f2937"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── 详情面板 ── */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 600, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', opacity: panelOpen ? 1 : 0, pointerEvents: panelOpen ? 'auto' : 'none', transition: 'opacity 0.4s', cursor: 'pointer' } as CSSProperties}
        onClick={closePanel}
      />
      {selected && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 700, width: 420, maxWidth: '92vw',
          background: 'linear-gradient(180deg,rgba(5,8,24,0.99),rgba(10,15,40,0.99))',
          borderLeft: '1px solid rgba(80,140,255,0.08)', boxShadow: '-16px 0 80px rgba(0,0,0,0.7)',
          display: 'flex', flexDirection: 'column',
          transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: panelOpen ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
        } as CSSProperties}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,transparent,${selected.glowColor.replace('0.4', '0.5')},transparent)` }} />
          <button onClick={closePanel} style={{ position: 'absolute', top: 18, right: 18, zIndex: 10, width: 36, height: 36, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.04)', color: 'rgba(180,200,240,0.5)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="1" y1="1" x2="11" y2="11"/><line x1="11" y1="1" x2="1" y2="11"/></svg>
          </button>
          <div style={{ flex: 1, overflowY: 'auto', padding: '36px 32px 24px' }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg,${selected.glowColor.replace('0.4', '0.15')},transparent)`, border: `1px solid ${selected.glowColor.replace('0.4', '0.2')}`, marginBottom: 24 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: `radial-gradient(circle at 30% 26%,${selected.color},${selected.color}aa)`, boxShadow: `0 0 16px ${selected.glowColor}` }} />
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#eef4ff', marginBottom: 6 }}>{selected.label}</div>
            <div style={{ width: 48, height: 2, borderRadius: 1, background: `linear-gradient(90deg,${selected.color},transparent)`, margin: '20px 0' }} />
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(180,200,240,0.55)', marginBottom: 32, fontWeight: 300 }}>{selected.description}</p>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase' as const, color: 'rgba(120,155,210,0.4)', marginBottom: 16 }}>推荐学习路径</div>
            {selected.learningPath.map((step, i) => {
              const isLast = i === selected.learningPath.length - 1;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 } as CSSProperties}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, flexShrink: 0, background: isLast ? selected.glowColor.replace('0.4', '0.12') : 'rgba(255,255,255,0.025)', border: `1px solid ${isLast ? selected.glowColor.replace('0.4', '0.35') : 'rgba(255,255,255,0.05)'}`, color: isLast ? selected.color : 'rgba(120,155,210,0.4)' }}>{i + 1}</div>
                  <span style={{ fontSize: 13.5, color: isLast ? '#e0ecff' : 'rgba(165,190,235,0.4)', fontWeight: isLast ? 500 : 400 }}>{step}</span>
                </div>
              );
            })}
          </div>
          <div style={{ padding: '22px 32px 28px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <button
              style={{ width: '100%', height: 48, borderRadius: 14, border: 'none', background: `linear-gradient(135deg,${selected.color},${selected.color}cc)`, color: '#fff', fontSize: 14.5, fontWeight: 600, letterSpacing: 0.8, cursor: 'pointer', boxShadow: `0 6px 28px ${selected.glowColor}` }}
              onClick={closePanel}
            >开始探索</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeUniverse;
