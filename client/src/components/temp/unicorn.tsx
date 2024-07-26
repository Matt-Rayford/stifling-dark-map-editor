import { createRef, useEffect, useState } from 'react';

export const Unicorn = () => {
  const [gameStep, setGameStep] = useState(1);
  const [code, setCode] = useState('-----');
  const validCode = '4h54n';
  const flashlightViewerRef = createRef<HTMLDivElement>();

  interface Particle {
    tiltAngle: number;
    tiltAngleIncremental: number;
    tilt: number;
    x: number;
    y: number;
    d: number;
    r: number;
    color: string;
  }

  useEffect(() => {
    if (flashlightViewerRef.current) {
      flashlightViewerRef.current.addEventListener(
        'mousemove',
        ({ offsetX, offsetY, target: eventTarget }) => {
          const target = eventTarget as HTMLDivElement;
          const x = offsetX / target.clientWidth;
          const y = offsetY / target.clientHeight;
          target.style.setProperty('--x', `${x * 100}%`);
          target.style.setProperty('--y', `${y * 100}%`);
        }
      );
      flashlightViewerRef.current.addEventListener(
        'click',
        ({ x, y, offsetX, offsetY }) => {
          if (
            offsetX > 540 &&
            offsetX < 610 &&
            offsetY > 445 &&
            offsetY < 535
          ) {
            setGameStep(2);
          }
        }
      );
    }
  }, [flashlightViewerRef.current]);

  useEffect(() => {
    if (code === validCode) {
      setGameStep(3);
    }
  }, [code]);

  useEffect(() => {
    if (gameStep === 3) {
      let W = window.innerWidth;
      let H = window.innerHeight;
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      const maxConfettis = 150;
      const particles: Particle[] = [];

      const possibleColors = [
        'DodgerBlue',
        'OliveDrab',
        'Gold',
        'Pink',
        'SlateBlue',
        'LightBlue',
        'Gold',
        'Violet',
        'PaleGreen',
        'SteelBlue',
        'SandyBrown',
        'Chocolate',
        'Crimson',
      ];

      function randomFromTo(from: number, to: number) {
        return Math.floor(Math.random() * (to - from + 1) + from);
      }

      const drawParticle = (
        context: CanvasRenderingContext2D,
        particle: Particle
      ) => {
        context.beginPath();
        context.lineWidth = particle.r / 2;
        context.strokeStyle = particle.color;
        context.moveTo(particle.x + particle.tilt + particle.r / 3, particle.y);
        context.lineTo(
          particle.x + particle.tilt,
          particle.y + particle.tilt + particle.r / 5
        );
        return context.stroke();
      };

      function Draw() {
        if (context) {
          const results = [];

          // Magical recursive functional love
          requestAnimationFrame(Draw);

          context.clearRect(0, 0, W, window.innerHeight);

          for (var i = 0; i < maxConfettis; i++) {
            results.push(drawParticle(context, particles[i]));
          }

          let remainingFlakes = 0;
          for (var i = 0; i < maxConfettis; i++) {
            const particle = particles[i];

            particle.tiltAngle += particle.tiltAngleIncremental;
            particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
            particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

            if (particle.y <= H) remainingFlakes++;

            // If a confetti has fluttered out of view,
            // bring it back to above the viewport and let if re-fall.
            if (particle.x > W + 30 || particle.x < -30 || particle.y > H) {
              particle.x = Math.random() * W;
              particle.y = -30;
              particle.tilt = Math.floor(Math.random() * 10) - 20;
            }
          }

          return results;
        }
      }

      window.addEventListener(
        'resize',
        function () {
          W = window.innerWidth;
          H = window.innerHeight;
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        false
      );

      // Push new confetti objects to `particles[]`
      for (var i = 0; i < maxConfettis; i++) {
        let particle: Particle = {
          x: Math.random() * W,
          y: Math.random() * H - H,
          r: randomFromTo(11, 33),
          d: Math.random() * maxConfettis + 11,
          tilt: Math.floor(Math.random() * 33) - 11,
          tiltAngleIncremental: Math.random() * 0.07 + 0.05,
          tiltAngle: 0,
          color:
            possibleColors[Math.floor(Math.random() * possibleColors.length)],
        };
        particles.push(particle);
      }

      // Initialize
      canvas.width = W;
      canvas.height = H;
      Draw();
    }
  }, [gameStep]);

  console.log('Code: ', code);

  return (
    <div
      className="content-container"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      {gameStep === 1 && (
        <div>
          <h1 style={{ textAlign: 'center' }}>
            Find Our Recent Offsite Location and Click It
          </h1>
          <div className="texas-viewer-container">
            <div className="texas-viewer" ref={flashlightViewerRef}></div>
          </div>
        </div>
      )}

      {gameStep === 2 && (
        <div>
          <h1>Figure Out The Code</h1>
          <div
            className="input-group"
            style={{
              marginTop: '25px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                style={{
                  position: 'relative',
                }}
              >
                <input
                  id={`code-${i}`}
                  type="text"
                  className="form-control"
                  required
                  onClick={() => {
                    const el = document.getElementById(
                      `code-${i}`
                    ) as HTMLInputElement;
                    el?.select();
                  }}
                  onChange={(e) => {
                    setCode(
                      `${code.substring(0, i - 1)}${
                        e.target.value
                      }${code.substring(i, 5)}`
                    );
                    const el = document.getElementById(
                      `code-${i + 1}`
                    ) as HTMLInputElement;
                    el?.focus();
                    el?.select();
                  }}
                  style={{
                    fontSize: '24pt',
                    backgroundColor: 'transparent',
                    color: 'white',
                    width: '60px',
                    height: '60px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                  value={code[i - 1]}
                />

                {code[i - 1] === validCode[i - 1] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16"
                    style={{ marginTop: 5 }}
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                )}
                {code[i - 1] !== validCode[i - 1] && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                    style={{ marginTop: 10 }}
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <h2 style={{ textAlign: 'left', marginTop: '25px' }}>
            Hints for Each Character
          </h2>
          <ol style={{ width: '350px', alignItems: 'start' }}>
            <li>
              This unicorn shows a <u>number</u> of values: Run through walls,
              Fight for simplicity, Always follow through, and Show up with
              Alacrity
            </li>
            <li>
              This unicorn can pull off wearing a Texas <u>h</u>at in style
            </li>
            <li>
              Pick a number 1-10. Add the next highest number to that number.
              Now add 9. Divide by 2. Subract the original number.
            </li>
            <li>1.</li>
            <li>
              What appears once in a moment, twice in a milennia, but never in a
              lifetime?
            </li>
          </ol>
        </div>
      )}

      {gameStep === 3 && (
        <div
          style={{
            position: 'relative',
            width: '100%',
          }}
        >
          <canvas
            id="canvas"
            style={{
              position: 'absolute',
              overflowY: 'hidden',
              overflowX: 'hidden',
              width: '100%',
              margin: 0,
              backgroundColor: 'transparent',
              left: '0',
              border: 'none',
              top: '-80px',
              height: '100vh',
            }}
          />
          <h1>Congratulations Ahsan! 🦄🦄🦄</h1>
          <img src="images/temp/ahsan.jpg" style={{ marginTop: '25px' }} />
        </div>
      )}
    </div>
  );
};
