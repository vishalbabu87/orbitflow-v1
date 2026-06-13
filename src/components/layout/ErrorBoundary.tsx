import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('OrbitFlow ErrorBoundary caught:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: 'var(--orbit-base)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            padding: '2rem',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '480px' }}>
            {/* OrbitFlow logo mark */}
            <div
              style={{
                width: '56px',
                height: '56px',
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <span style={{ fontSize: '24px' }}>!</span>
            </div>

            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'var(--orbit-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                marginBottom: '12px',
              }}
            >
              System / Runtime Error
            </p>

            <h1
              style={{
                fontSize: '36px',
                fontWeight: 900,
                color: 'var(--orbit-text-primary)',
                letterSpacing: '-0.05em',
                fontStyle: 'italic',
                textTransform: 'uppercase',
                lineHeight: 1,
                marginBottom: '16px',
              }}
            >
              Something Crashed
            </h1>

            <p
              style={{
                color: 'var(--orbit-text-secondary)',
                fontSize: '13px',
                lineHeight: 1.6,
                marginBottom: '32px',
              }}
            >
              An unexpected error occurred. Please refresh the page or contact support.
            </p>

            {this.state.error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  marginBottom: '24px',
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '11px',
                    color: 'rgba(239, 68, 68, 0.9)',
                    wordBreak: 'break-all',
                  }}
                >
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 32px',
                background: '#6366F1',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '10px',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
