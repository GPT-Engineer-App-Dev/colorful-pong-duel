import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const Index = () => {
  const canvasRef = useRef(null);
  const [isGameRunning, setIsGameRunning] = useState(false);

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
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    const drawRect = (x, y, w, h, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, w, h);
    };

    const drawCircle = (x, y, r, color) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, true);
      context.fill();
    };

    const drawNet = () => {
      for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "white");
      }
    };

    const draw = () => {
      drawRect(0, 0, canvas.width, canvas.height, "black");
      drawNet();
      drawRect(0, paddle1Y, paddleWidth, paddleHeight, "red");
      drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, "blue");
      drawCircle(ballX, ballY, ballSize, "white");
    };

    const move = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

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
          paddle1Y = Math.max(paddle1Y - 20, 0);
          break;
        case "s":
          paddle1Y = Math.min(paddle1Y + 20, canvas.height - paddleHeight);
          break;
        case "ArrowUp":
          paddle2Y = Math.max(paddle2Y - 20, 0);
          break;
        case "ArrowDown":
          paddle2Y = Math.min(paddle2Y + 20, canvas.height - paddleHeight);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGameRunning]);

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" bg="gray.800">
      <Text fontSize="4xl" color="white" mb={4}>
        2-Player Pong Game
      </Text>
      <Box>
        <canvas ref={canvasRef} width="800" height="600" style={{ border: "1px solid white" }} />
      </Box>
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