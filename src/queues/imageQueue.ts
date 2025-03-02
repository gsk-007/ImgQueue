import Queue from "bull";

export default new Queue("image-processing", process.env.REDIS_URL as string);
