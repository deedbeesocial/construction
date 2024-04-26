"use client";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { motion, useAnimationControls } from "framer-motion";
import { memo, useEffect, useMemo, useState } from "react";
import ReactCountdown from "react-countdown";
import type { CountdownProps, CountdownRendererFn } from "react-countdown";

const StaticCard = ({
  position,
  unit,
}: {
  position: "upper" | "lower";
  unit: number | string;
}) => {
  if (position === "upper") {
    return (
      <Flex
        pos="relative"
        justifyContent="center"
        w="100%"
        h="50%"
        overflow="hidden"
        alignItems="flex-end"
        borderTopRadius={6}
        borderBottom="1px solid #0E1116"
      >
        <Text
          fontSize="6xl"
          fontWeight="normal"
          transform="translateY(50%)"
          color="white"
        >
          {unit}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      pos="relative"
      justifyContent="center"
      w="100%"
      h="50%"
      overflow="hidden"
      alignItems="flex-start"
      bgColor="#181c22"
      borderTop="1px solid #0E1116"
    >
      <Text
        fontSize="6xl"
        fontWeight="normal"
        transform="translateY(-50%)"
        color="white"
      >
        {unit}
      </Text>
    </Flex>
  );
};

const MotionFlex = motion(Flex);

const AnimatedCard = memo(
  ({
    current,
    previous,
  }: {
    current: number | string;
    previous: number | string;
  }) => {
    const [displayUnit, setDisplayUnit] = useState(previous);
    const controls = useAnimationControls();

    useEffect(() => {
      controls.start({
        rotateX: [0, -180],
        transition: { duration: 0.6, ease: "easeInOut" },
      });
      setDisplayUnit(previous);
    }, [previous]);

    return (
      <MotionFlex
        id="animated-card"
        animate={controls}
        justifyContent="center"
        pos="absolute"
        left={0}
        w="100%"
        h="50%"
        overflow="hidden"
        sx={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
        top={0}
        alignItems="flex-end"
        transformOrigin="50% 100%"
        transform="rotateX(0deg)"
        bgColor="#12161C"
        borderTopRadius={6}
        borderBottom="1px solid #0E1116"
        onAnimationComplete={() => {
          setDisplayUnit(current);
          controls.set({ rotateX: 0 });
        }}
      >
        <Text
          fontSize="6xl"
          fontWeight="normal"
          transform="translateY(50%)"
          color="white"
        >
          {displayUnit}
        </Text>
      </MotionFlex>
    );
  }
);

const AnimatedCardBottom = ({ unit }: { unit: number | string }) => {
  const [displayUnit, setDisplayUnit] = useState(unit);
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      rotateX: [180, 0],
      transition: { duration: 0.6, ease: "easeInOut" },
    });
    setDisplayUnit(unit);
  }, [unit]);

  return (
    <MotionFlex
      id="animated-card"
      animate={controls}
      justifyContent="center"
      pos="absolute"
      left={0}
      w="100%"
      h="50%"
      overflow="hidden"
      sx={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
      top="50%"
      alignItems="flex-start"
      transformOrigin="50% 0%"
      transform="rotateX(180deg)"
      bgColor="#181c22"
      borderTop="1px solid #0E1116"
    >
      <Text
        fontSize="6xl"
        fontWeight="normal"
        transform="translateY(-50%)"
        color="white"
      >
        {displayUnit}
      </Text>
    </MotionFlex>
  );
};

const FlipContainer = ({
  number,
  title,
}: {
  number: number;
  title: "days" | "hours" | "mins" | "secs";
}) => {
  const { current, previous } = useMemo(() => {
    const currentDigit = number;
    const previousDigit = number + 1;

    const current =
      currentDigit < 10
        ? `0${currentDigit}`
        : (title === "secs" || title === "mins") && currentDigit === 60
        ? "00"
        : currentDigit;
    const previous =
      previousDigit < 10
        ? `0${previousDigit}`
        : (title === "secs" || title === "mins") && previousDigit === 60
        ? "00"
        : previousDigit;

    return { current, previous };
  }, [number]);

  return (
    <Box shadow="0px 10px 10px -10px black" borderBottomRadius={6}>
      <Box
        display="block"
        pos="relative"
        w="140px"
        h="120px"
        bgColor="#12161C"
        rounded="6px"
        sx={{ perspective: "300px", perspectiveOrigin: "50% 50%" }}
      >
        <StaticCard position="upper" unit={current} />
        <StaticCard position="lower" unit={previous} />
        <AnimatedCard current={current} previous={previous} />
        <AnimatedCardBottom unit={current} />
      </Box>
      <Center py={2} bgColor="#1d2127">
        <Text
          fontSize="xs"
          fontWeight="light"
          textTransform="uppercase"
          color="white"
        >
          {title}
        </Text>
      </Center>
    </Box>
  );
};

const renderer: CountdownRendererFn = ({
  hours,
  minutes,
  seconds,
  completed,
  days,
}) => {
  if (completed) return null;
  return (
    <Center>
      <HStack align="center" spacing={1}>
        <FlipContainer number={days} title="days" />
        <FlipContainer number={hours} title="hours" />
        <FlipContainer number={minutes} title="mins" />
        <FlipContainer number={seconds} title="secs" />
      </HStack>
    </Center>
  );
};

export const Countdown = ({ date }: Pick<CountdownProps, "date">) => {
  return <ReactCountdown date={date} renderer={renderer} />;
};
