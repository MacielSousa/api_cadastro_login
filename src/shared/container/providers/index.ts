import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { LocalStorageProvider } from "./StorageProvider/implementat/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);


container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
);