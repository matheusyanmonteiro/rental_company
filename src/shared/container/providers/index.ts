import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementatios/DayJsDateProvider";

container.registerSingleton<IDateProvider>(
  'DayjsDateProvider',
  DayJsDateProvider
);