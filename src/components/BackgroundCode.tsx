'use client';

import { useEffect, useState } from 'react';

const coreCode = `// UZAYROX DIGITAL CORE INITIALIZATION
async function bootSystem() {
  const terminal = new SecureTerminal();
  await terminal.connect();
  
  terminal.log('Establishing secure connection...');
  const nodes = await Network.scan();
  
  for (const node of nodes) {
    if (node.isCompromised) {
      Security.isolate(node);
      terminal.warn(\`Isolated node: \${node.id}\`);
    } else {
      node.sync(CoreData);
    }
  }

  return { status: 'ONLINE', nodesActive: nodes.length };
}

interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassPanel: React.FC<ComponentProps> = ({ children }) => {
  return (
    <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl p-6">
      {children}
    </div>
  );
};`;

export default function BackgroundCode() {
  const [displayedCode, setDisplayedCode] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < coreCode.length) {
      const timeout = setTimeout(() => {
        // Typing chunk to simulate realistic fast hacker typing
        const chunkSize = Math.floor(Math.random() * 5) + 1;
        setDisplayedCode(prev => prev + coreCode.substring(index, index + chunkSize));
        setIndex(prev => prev + chunkSize);
      }, Math.random() * 50 + 10);
      return () => clearTimeout(timeout);
    } else {
      // Loop it after a pause
      const resetTimer = setTimeout(() => {
        setDisplayedCode('');
        setIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimer);
    }
  }, [index]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05] select-none code-font">
      <div className="relative w-full h-full p-8 md:p-16">
        <pre className="text-white text-xs sm:text-sm whitespace-pre-wrap font-mono leading-relaxed max-w-4xl opacity-50">
          {displayedCode}
          <span className="inline-block w-2 h-4 bg-red-500 animate-pulse ml-1 align-middle" />
        </pre>
      </div>
    </div>
  );
}
