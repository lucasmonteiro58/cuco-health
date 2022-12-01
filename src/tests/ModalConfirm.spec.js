import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ModalConfirm from "../components/ModalConfirm.vue";

describe("ModalConfirm", () => {
  //check if the component renders properly
  it("renders properly", () => {
    const wrapper = mount(ModalConfirm);
    expect(wrapper.html()).toMatchSnapshot();
  });
  // check if the component emits the correct event
  it("emits the correct event", () => {
    const wrapper = mount(ModalConfirm);
    wrapper.find("#btn-confirm").trigger("click");
    expect(wrapper.emitted("confirm")).toBeTruthy();
  });
  // check if the component emits the correct event
  it("emits the correct event", () => {
    const wrapper = mount(ModalConfirm);
    wrapper.find("#btn-cancel").trigger("click");
    expect(wrapper.emitted("cancel")).toBeTruthy();
  });
});
