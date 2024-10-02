import { useState } from "react";
import Modal from "./Modal";
import { userEvent, within, waitFor, expect } from "@storybook/test";

export default {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
  //   render จะเป็น default องค์ประกอบ เพราะถ้าเอามาแค่ Modal จะไม่สามารถควบคุมการเปิดปิดได้
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {
    //  argument ร่วมกัน
    children: <p>Modal Content</p>,
  },
};

export const ClosedModal = {
  args: {
    isOpen: false,
  },
};

export const OpenModal = {
  args: {
    isOpen: true,
  },
};

export const InteractionTest = {
  args: {
    isOpen: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement); //render component
    const openButton = canvas.getByText("Open Modal"); //check button
    userEvent.click(openButton);

    await waitFor(() => {
      // wait action > modal open
      expect(canvas.getByText(/Modal Content/i)).toBeInTheDocument();
    });

    const closeButton = canvas.getByLabelText("Close");
    userEvent.click(closeButton);

    await waitFor(() => {
      // wait action > modal close
      expect(canvas.queryByText(/Modal Content/i)).not.toBeInTheDocument();
    });
  },
};
