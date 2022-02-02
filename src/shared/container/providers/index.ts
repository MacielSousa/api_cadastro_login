import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { LocalStorageProvider } from "./StorageProvider/implementat/LocalStorageProvider";
import { S3StorgeProvider } from "./StorageProvider/implementat/S3StorgeProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
);


const disckStorage =  {
    local: LocalStorageProvider,
    s3: S3StorgeProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    LocalStorageProvider
);