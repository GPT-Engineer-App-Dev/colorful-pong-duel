import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [ballSpeed, setBallSpeed] = useState(5); // Default ball speed
  const paddle1Velocity = useRef(0);
  const paddle2Velocity = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const paddleWidth = 10;
    const paddleHeight = 100;
    const ballSize = 10;

    let paddle1Y = canvas.height / 2 - paddleHeight / 2;
    let paddle2Y = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = ballSpeed; // Use the selected ball speed
    let ballSpeedY = ballSpeed; // Use the selected ball speed

    const drawRect = (x, y, w, h, color1, color2) => {
      const gradient = context.createLinearGradient(x, y, x + w, y + h);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      context.fillStyle = gradient;
      context.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color1, color2) => {
      const gradient = context.createRadialGradient(x, y, r / 2, x, y, r);
      gradient.addColorStop(0, color1);
      gradient.addColorStop(1, color2);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#ffffff", "#000000"); // Net gradient
      }
    };

    const draw = () => {
      drawRect(0, 0, canvas.width, canvas.height, "#87CEEB", "#00BFFF"); // Background gradient
      drawNet();
      drawRect(0, paddle1Y, paddleWidth, paddleHeight, "#ff512f", "#dd2476"); // Paddle 1 gradient
      drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, "#36d1dc", "#5b86e5"); // Paddle 2 gradient
      drawCircle(ballX, ballY, ballSize, "#ffe259", "#ffa751"); // Ball gradient
    };

    const move = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      paddle1Y += paddle1Velocity.current;
      paddle2Y += paddle2Velocity.current;

      // Ensure paddles stay within the canvas
      paddle1Y = Math.max(Math.min(paddle1Y, canvas.height - paddleHeight), 0);
      paddle2Y = Math.max(Math.min(paddle2Y, canvas.height - paddleHeight), 0);

      if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
      }

      if (ballX - ballSize < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
          ballSpeedX = -ballSpeedX;
        } else {
          resetBall();
        }
      }

      if (ballX + ballSize > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
          ballSpeedX = -ballSpeedX;
        } else {
          resetBall();
        }
      }
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -ballSpeedX;
    };

    const gameLoop = () => {
      if (isGameRunning) {
        move();
        draw();
      }
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "w":
          paddle1Velocity.current = -5;
          break;
        case "s":
          paddle1Velocity.current = 5;
          break;
        case "ArrowUp":
          paddle2Velocity.current = -5;
          break;
        case "ArrowDown":
          paddle2Velocity.current = 5;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key) {
        case "w":
        case "s":
          paddle1Velocity.current = 0;
          break;
        case "ArrowUp":
        case "ArrowDown":
          paddle2Velocity.current = 0;
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isGameRunning, paddle1Velocity, paddle2Velocity, ballSpeed]);

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" bg="gray.800">
      <Text fontSize="4xl" color="white" mb={4}>
        2-Player Pong Game
      </Text>
      <Box>
        <canvas ref={canvasRef} width="800" height="600" style={{ border: "1px solid white" }} />
      </Box>
      <Flex direction="column" align="center" mt={4}>
        <Text fontSize="xl" color="white" mb={2}>
          Ball Speed
        </Text>
        <Slider
          aria-label="ball-speed-slider"
          defaultValue={5}
          min={1}
          max={10}
          step={1}
          onChange={(val) => setBallSpeed(val)}
          width="300px"
          colorScheme="teal"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Flex>
      <Button
        mt={4}
        colorScheme={isGameRunning ? "red" : "green"}
        onClick={() => setIsGameRunning(!isGameRunning)}
      >
        {isGameRunning ? "Stop Game" : "Start Game"}
      </Button>
    </Flex>
  );
};

export default Index;