import Carousel from "./Carousel";
import { within, userEvent, waitFor, expect } from "@storybook/test";

export default {
  title: "Carousel",
  component: Carousel,
  tags: ["autodocs"],
  args: {
    images: [
      "https://fastly.picsum.photos/id/648/300/200.jpg?hmac=1CBWajz31GOLUdds_HpCDPaHDG6FF3eoY1fYcoFgEMY",
      "https://fastly.picsum.photos/id/69/300/200.jpg?hmac=eLc6u_j4wqI6rURIhekE0kS1oYHTmD7tNZ1LeEPyIeY",
      "https://fastly.picsum.photos/id/625/300/200.jpg?hmac=2JeYxbeay5cJXc4_CqXxaSVY6atO8yOJOZ9emIGYDf4",
    ],
  },
};

export const Basic = {
  args: {
    autoplay: false,
  },
};

export const Autoplay = {
  args: {
    autoplay: true,
    interval: 1000,
  },
};

export const CustomStartIndex = {
  args: {
    startIndex: 1,
    autoplay: false,
  },
};

export const NextImageInteraction = {
  args: {
    autoplay: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nextButton = canvas.getByText("Next");
    await userEvent.click(nextButton);

    await waitFor(async () => {
      //alt={`Slide ${currentIndex}`}
      await expect(canvas.getByAltText("Slide 1")).toBeInTheDocument();
    });
  },
};

export const PrevImageInteraction = {
  args: {
    autoplay: false,
    startIndex: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const prevButton = canvas.getByText("Previous");
    await userEvent.click(prevButton);

    await waitFor(async () => {
      // Replace this with the actual logic to verify the image change
      await expect(canvas.getByAltText("Slide 0")).toBeInTheDocument();
    });
  },
};
