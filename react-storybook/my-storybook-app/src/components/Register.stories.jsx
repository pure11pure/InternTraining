import Register from "./Register";
import { within, userEvent, expect } from "@storybook/test";
import { rest } from "msw";

export default {
  title: "RegisterForm",
  component: Register,
  tags: ["autodocs"],
  parameters: {
    msw: {
      handlers: [
        rest.post("https://66f4d3fe77b5e889709a979c.mockapi.io/users", (req, res, ctx) => {
          return res(ctx.json({ message: "Register successful!" }), ctx.status(200));
        }),
      ],
    },
  },
};

export const Default = {};

export const FilledState = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByTestId("name"), "John Doe", { delay: 100 });
    await userEvent.type(canvas.getByTestId("email"), "johndoe@example.com", {
      delay: 100,
    });
    await userEvent.type(canvas.getByTestId("phoneNumber"), "1234567890", {
      delay: 100,
    });
  },
};

export const ErrorState = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByTestId("email"), "invalid-email", {
      delay: 100,
    });
    await userEvent.click(canvas.getByText("Submit"));

    await expect(canvas.getByText("Email is invalid")).toBeInTheDocument();
    await expect(canvas.getByText("Name is required")).toBeInTheDocument();
    await expect(canvas.getByText("Phone number is required")).toBeInTheDocument();
  },
};

export const SuccessSubmit = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByTestId("name"), "John Doe");
    await userEvent.type(canvas.getByTestId("email"), "johndoe@example.com");
    await userEvent.type(canvas.getByTestId("phoneNumber"), "1234567890");

    userEvent.click(canvas.getByText("Submit"));
  },
};