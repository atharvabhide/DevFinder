import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import './Terminal.css';

const TerminalComponent = () => {
  const terminalRef = useRef(null);
  const fitAddon = useRef(new FitAddon());

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
      fontSize: 12,
      fontWeight: 'normal',
      letterSpacing: 0.6,
      lineHeight: 1.5,
      theme: {
        background: '#1c1c1e',
        foreground: '#fff',
        cursor: '#c7c7cc',
      },
    });

    terminal.loadAddon(fitAddon.current);
    terminal.open(terminalRef.current);
    fitAddon.current.fit();

    return () => {
      terminal.dispose();
    };
  }, []);

  return <div className="terminal" ref={terminalRef} />;
};

export default TerminalComponent;