import { motion } from 'framer-motion';
import { Send, PenTool, Type, Image as ImageIcon, Hash, Square, MessageSquare } from 'lucide-react';

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Card 1 Illustration â€” Drag & Drop Editor
   Pink gradient base with toolbar, floating asset, and cursor
   Mimics Draftr screenshot style
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/
const DragDropIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FFF5FE] select-none dark:bg-pink-950/30">
    {/* Dotted target slot */}
    <div
      className="absolute bottom-[12%] left-[8%] flex h-[55%] w-[42%] items-center justify-center rounded-2xl border-2 border-dashed border-pink-200/80 dark:border-pink-800/50"
      style={{ background: 'rgba(255, 255, 255, 0.2)' }}
    />

    {/* Toolbar */}
    <div className="absolute top-[12%] right-[10%] left-[10%] z-10 flex h-12 items-center justify-between rounded-xl border border-pink-100/50 bg-white px-4 shadow-[0_2px_12px_rgba(230,200,230,0.25)] dark:border-pink-900/30 dark:bg-gray-900">
      <div className="rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300">
        <Send size={15} />
      </div>
      <div className="rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600">
        <PenTool size={15} />
      </div>
      <div className="rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600">
        <Type size={15} />
      </div>
      <div className="rounded-lg bg-gray-900 p-1.5 text-white shadow-sm">
        <ImageIcon size={15} />
      </div>
      <div className="rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600">
        <Hash size={15} />
      </div>
      <div className="rounded-lg p-1.5 text-gray-400 transition-colors hover:text-gray-600">
        <Square size={15} />
      </div>
    </div>

    {/* Dragging element with organic gradient */}
    <motion.div
      className="absolute right-[8%] bottom-[18%] z-10 h-[46%] w-[50%] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgba(244,63,94,0.15)]"
      style={{
        background: 'linear-gradient(135deg, #FFA6C9 0%, #B3C5FF 50%, #FFC3A0 100%)',
      }}
      animate={{
        x: [0, -12, 0],
        y: [0, -6, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]" />
    </motion.div>

    {/* Pointer / Cursor */}
    <motion.div
      className="pointer-events-none absolute z-20"
      style={{
        bottom: '15%',
        right: '48%',
      }}
      animate={{
        x: [0, -12, 0],
        y: [0, -6, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
      >
        {/* Modern clean arrow cursor */}
        <path
          d="M4.5 3V17.5L9.8 12.8L15.5 21L18.5 19L13 11L18 10L4.5 3Z"
          fill="white"
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  </div>
);

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Card 2 Illustration â€” Advanced Prototyping
   Yellow/orange background with yellow rect, orange circle, connection, and emoji
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/
const PrototypingIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FFFBF0] select-none dark:bg-amber-950/20">
    {/* Connector SVG line */}
    <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 1 }}>
      <path
        d="M 125 70 C 180 70, 160 135, 215 135"
        stroke="#E2E8F0"
        strokeWidth="2"
        fill="none"
        className="leading-relaxed dark:stroke-gray-800"
      />
      {/* Node connecting points */}
      <circle
        cx="125"
        cy="70"
        r="4"
        fill="white"
        stroke="#CBD5E1"
        strokeWidth="2"
        className="dark:fill-gray-900 dark:stroke-gray-700"
      />
      <circle
        cx="215"
        cy="135"
        r="4"
        fill="white"
        stroke="#CBD5E1"
        strokeWidth="2"
        className="dark:fill-gray-900 dark:stroke-gray-700"
      />

      {/* Flow arrow indicator */}
      <polygon points="172,98 178,102 174,106" fill="#A0AEC0" className="leading-relaxed dark:fill-gray-700" />
    </svg>

    {/* Left Yellow Rect */}
    <div
      className="absolute top-[16%] left-[12%] z-10 h-[32%] w-[24%] rounded-lg border border-amber-300/40 bg-[#FCD34D] shadow-sm"
      style={{ background: 'linear-gradient(135deg, #FDE047 0%, #F59E0B 100%)' }}
    >
      {/* Resize corner handles */}
      <div className="absolute -top-1 -left-1 h-2 w-2 border border-amber-500 bg-white" />
      <div className="absolute -top-1 -right-1 h-2 w-2 border border-amber-500 bg-white" />
      <div className="absolute -bottom-1 -left-1 h-2 w-2 border border-amber-500 bg-white" />
      <div className="absolute -right-1 -bottom-1 h-2 w-2 border border-amber-500 bg-white" />
    </div>

    {/* Right Orange Circle */}
    <div
      className="absolute right-[12%] bottom-[24%] z-10 h-[32%] w-[24%] rounded-full shadow-sm"
      style={{ background: 'linear-gradient(135deg, #FFA07A 0%, #FF6347 100%)' }}
    >
      {/* Resize bounding box */}
      <div className="pointer-events-none absolute -inset-1 rounded-lg border border-orange-300/50" />
      <div className="absolute -top-1.5 -left-1.5 h-2 w-2 border border-orange-500 bg-white" />
      <div className="absolute -top-1.5 -right-1.5 h-2 w-2 border border-orange-500 bg-white" />
      <div className="absolute -bottom-1.5 -left-1.5 h-2 w-2 border border-orange-500 bg-white" />
      <div className="absolute -right-1.5 -bottom-1.5 h-2 w-2 border border-orange-500 bg-white" />
    </div>

    {/* Bottom Emoji Chip */}
    <motion.div
      className="absolute bottom-[10%] left-[24%] z-20 flex h-[34%] w-[32%] items-center justify-center rounded-2xl border border-purple-200/60 bg-[#E8DDFE] shadow-[0_4px_16px_rgba(139,92,246,0.15)]"
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: 0.5,
      }}
    >
      <span className="text-3xl">ðŸ˜†</span>
    </motion.div>
  </div>
);

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Card 3 Illustration â€” Real-Time Collaboration
   Light blue/indigo base with concentric circles and avatars
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/
const CollabIllustration = () => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#F4F6FF] select-none dark:bg-indigo-950/20">
    {/* Concentric rings */}
    <div className="absolute h-[240px] w-[240px] rounded-full border border-indigo-100/80 dark:border-indigo-900/40" />
    <div className="absolute h-[180px] w-[180px] rounded-full border border-indigo-100/60 dark:border-indigo-900/40" />
    <div className="absolute h-[120px] w-[120px] rounded-full border border-indigo-100/40 dark:border-indigo-900/40" />

    {/* Central chat bubble icon */}
    <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-[0_8px_24px_rgba(79,70,229,0.35)]">
      <MessageSquare className="h-6 w-6 fill-white/10 text-white" />
    </div>

    {/* Avatar 1 (Top Right) */}
    <motion.div
      className="absolute top-[16%] right-[22%] h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          'url(/images/ai_feature_1.jpg)',
      }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Avatar 2 (Left) */}
    <motion.div
      className="absolute top-[35%] left-[10%] h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          'url(/images/ai_feature_2.jpg)',
      }}
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
    />

    {/* Avatar 3 (Bottom Left) */}
    <motion.div
      className="absolute bottom-[20%] left-[24%] h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          'url(/images/ai_feature_3.jpg)',
      }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
    />

    {/* Avatar 4 (Bottom Right) */}
    <motion.div
      className="absolute right-[26%] bottom-[14%] h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-cover bg-center shadow-md"
      style={{
        backgroundImage:
          'url(/images/ai_feature_4.jpg)',
      }}
      animate={{ y: [0, 4, 0] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
    />
  </div>
);

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   Main BentoFeatures Component
 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€*/
const cards = [
  {
    id: 'workflow',
    label: 'Visual Editor',
    title: 'Intuitive drag & drop editor',
    description:
      'Create stunning designs effortlessly with a user-friendly visual builder built for precision.',
    borderGlow: 'rgba(236, 72, 153, 0.15)',
    labelColor: '#EC4899',
    Illustration: DragDropIllustration,
  },
  {
    id: 'copilot',
    label: 'Prototyping',
    title: 'Advanced prototyping',
    description:
      'Turn static ideas into interactive, high-fidelity prototypes without writing code.',
    borderGlow: 'rgba(245, 158, 11, 0.15)',
    labelColor: '#F59E0B',
    Illustration: PrototypingIllustration,
  },
  {
    id: 'collab',
    label: 'Collaboration',
    title: 'Real-time collaboration',
    description:
      'Work seamlessly with your team, get instant feedback, and align in a single workspace.',
    borderGlow: 'rgba(79, 70, 229, 0.15)',
    labelColor: '#6366F1',
    Illustration: CollabIllustration,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: i * 0.1,
    },
  }),
};

export const BentoFeatures = () => (
  <section className="relative overflow-hidden bg-white transition-colors duration-300 dark:bg-[#0B0F19] py-[clamp(4rem,8vw,6rem)]">
    {/* Subtle grid accent */}
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
      style={{
        backgroundImage: 'radial-gradient(#111 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />

    <div className="relative z-10 mx-auto max-w-5xl px-6">
      {/* Section Header */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="leading-relaxed mb-4 text-sm font-medium tracking-tight text-gray-500 dark:text-gray-500">
          Everything you need to create, prototype, and collaborate - all in a single, easy-to-use
          platform.
        </p>
      </motion.div>

      {/* Grid containing the 3 refined cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="elite-card group flex cursor-default flex-col overflow-hidden rounded-3xl"
          >
            {/* Illustration area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-[var(--orbit-border-subtle)]">
              <card.Illustration />
            </div>

            {/* Content area */}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-1.5 text-fluid-3xl leading-snug font-bold text-gray-900 dark:text-white">
                {card.title}
              </h3>
              <p className="text-lg leading-relaxed font-normal text-gray-500 sm:text-base dark:text-gray-500">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
