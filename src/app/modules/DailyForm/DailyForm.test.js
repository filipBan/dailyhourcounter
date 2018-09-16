import React from "react";
import { shallow, mount } from "enzyme";
import DailyForm from "./DailyForm";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { start } from "repl";

describe("Daily Form component", () => {
  let props;

  beforeEach(() => {
    const fetchDailyData = jest.fn();
    props = {
      auth: {
        isLoggedIn: true
      },
      today: moment(),
      fetchDailyData: fetchDailyData
    };
  });

  it("Renders without crashing", () => {
    shallow(<DailyForm {...props} />);
  });

  it("Does not render if user is not logged in", () => {
    const auth = {
      isLoggedIn: false
    };
    const wrapper = shallow(<DailyForm {...props} auth={auth} />);
    expect(
      wrapper.containsMatchingElement(<Redirect to="/" push={false} />)
    ).toBeTruthy();
  });

  it("Calls fetchDailyData on mount", () => {
    shallow(<DailyForm {...props} />);
    expect(props.fetchDailyData).toHaveBeenCalledTimes(1);
  });

  it("Calls fetchDailyData on componentDidUpdate", () => {
    const wrapper = shallow(<DailyForm {...props} />);
    wrapper.setProps({ today: moment().subtract(2, "days") });
    expect(props.fetchDailyData).toHaveBeenCalledTimes(2);
  });

  it("Displays correct date in the top bar", () => {
    const today = moment("2018-05-09");

    const wrapper = shallow(<DailyForm {...props} today={today} />);
    const date = wrapper
      .find(".today-date")
      .find("span")
      .text();
    expect(date).toEqual("Wed 9th May 2018");
  });

  it("Handles going one day back correctly", () => {
    const today = moment("2018-05-09");
    const yesterday = today.clone().subtract(1, "day");
    const handleCalendarChange = jest.fn();

    const wrapper = shallow(
      <DailyForm
        {...props}
        today={today}
        handleCalendarChange={handleCalendarChange}
      />
    );

    wrapper.find("#day-back").simulate("click");

    expect(handleCalendarChange).toHaveBeenCalledWith(yesterday);
  });

  it("Handles going one day forward correctly", () => {
    const handleCalendarChange = jest.fn();
    const today = moment("2018-05-09");
    const tomorrow = today.clone().add(1, "day");

    const wrapper = shallow(
      <DailyForm
        {...props}
        today={today}
        handleCalendarChange={handleCalendarChange}
      />
    );

    wrapper.find("#day-forward").simulate("click");

    expect(handleCalendarChange).toHaveBeenCalledWith(tomorrow);
  });

  it("Start button is enabled, others are disabled", () => {
    const wrapper = shallow(<DailyForm {...props} />);

    const startHours = wrapper
      .find(".work-hours")
      .find(".from-to-container")
      .childAt(0);

    const endHours = wrapper
      .find(".work-hours")
      .find(".from-to-container")
      .childAt(1);

    const startBreaks = wrapper
      .find(".break-hours")
      .find(".from-to-container")
      .childAt(1);

    const endBreaks = wrapper
      .find(".break-hours")
      .find(".from-to-container")
      .childAt(1);

    expect(startHours.prop("disabled")).not.toBeTruthy();
    expect(endHours.prop("disabled")).toBeTruthy();
    expect(startBreaks.prop("disabled")).toBeTruthy();
    expect(endBreaks.prop("disabled")).toBeTruthy();
  });

  it("Enables buttons in the right order", () => {
    const wrapper = shallow(<DailyForm {...props} />);

    wrapper.setProps({ workStart: moment() });

    const endHours = wrapper
      .find(".work-hours")
      .find(".from-to-container")
      .childAt(1);

    expect(endHours.prop("disabled")).not.toBeTruthy();

    wrapper.setProps({ workEnd: moment() });

    const startBreaks = wrapper
      .find(".break-hours")
      .find(".from-to-container")
      .childAt(0);

    expect(startBreaks.prop("disabled")).not.toBeTruthy();

    wrapper.setProps({ breakStart: moment() });

    const endBreaks = wrapper
      .find(".break-hours")
      .find(".from-to-container")
      .childAt(1);

    expect(endBreaks.prop("disabled")).not.toBeTruthy();
  });

  it("Calls reset function when reset button is clicked", () => {
    const resetDailyData = jest.fn();
    const workStart = moment();
    const uid = "unique_id";
    const wrapper = shallow(
      <DailyForm
        {...props}
        resetDailyData={resetDailyData}
        uid={uid}
        workStart={workStart}
      />
    );

    const resetButton = wrapper.find("#reset-button");

    resetButton.simulate("click");

    expect(resetDailyData).toHaveBeenCalledWith({ workStart, uid });
  });
});
