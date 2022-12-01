import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "../views/HomeView.vue";
import ModalConfirm from "../components/ModalConfirm.vue";

describe("HomeView", () => {
  //check if the component renders properly
  it("renders properly", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.html()).toMatchSnapshot();
  });
  // check import moment
  it("import moment", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.vm.moment).toBeTruthy();
  });
  //check import Pagination componet
  it("import Pagination", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.vm.Pagination).toBeTruthy();
  });
  // check function getClients
  it("function getClients", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.vm.getClients).toBeTruthy();
  });
  // check function deleteClient
  it("function deleteClients", () => {
    const wrapper = mount(HomeView);
    expect(wrapper.vm.deleteClients).toBeTruthy();
  });
  // check btn-search click
  it("btn-search click", () => {
    const wrapper = mount(HomeView);
    wrapper.find("#btn-search").trigger("click");
    expect(wrapper.vm.getClients).toBeTruthy();
  });
});
