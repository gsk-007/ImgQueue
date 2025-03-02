import Queue from "bull";

const imageProcessingQueue = new Queue(
  "image-processing",
  process.env.REDIS_URL as string
);

imageProcessingQueue.on("ready", () => {
  console.log("Redis is connected and the queue is ready");
});

imageProcessingQueue.on("error", (err) => {
  console.error("Error with Redis connection:", err);
});

export default imageProcessingQueue;
