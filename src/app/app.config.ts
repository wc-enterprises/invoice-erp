import { provideHttpClient } from "@angular/common/http";
import {
  APP_INITIALIZER,
  ApplicationConfig,
  inject,
} from "@angular/core";
import { LuxonDateAdapter } from "@angular/material-luxon-adapter";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  PreloadAllModules,
  provideRouter,
  withInMemoryScrolling,
  withPreloading,
} from "@angular/router";
import { provideFuse } from "@fuse";
import { provideTransloco, TranslocoService } from "@ngneat/transloco";
import { firstValueFrom } from "rxjs";
import { appRoutes } from "app/app.routes";
import { provideIcons } from "app/core/icons/icons.provider";
import { mockApiServices } from "app/services";
import { TranslocoHttpLoader } from "./core/transloco/transloco.http-loader";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { connectDatabaseEmulator, getDatabase, provideDatabase } from "@angular/fire/database"
import { getAuth, provideAuth } from "@angular/fire/auth";
import { environment } from "./environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: "D",
        },
        display: {
          dateInput: "DDD",
          monthYearLabel: "LLL yyyy",
          dateA11yLabel: "DD",
          monthYearA11yLabel: "LLLL yyyy",
        },
      },
    },

    // Transloco Config
    provideTransloco({
      config: {
        availableLangs: [
          {
            id: "en",
            label: "English",
          },
          {
            id: "tr",
            label: "Turkish",
          },
        ],
        defaultLang: "en",
        fallbackLang: "en",
        reRenderOnLangChange: true,
        prodMode: true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      useFactory: () => {
        const translocoService = inject(TranslocoService);
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);

        return () => firstValueFrom(translocoService.load(defaultLang));
      },
      multi: true,
    },

    // Fuse
    // provideAuth(),
    provideIcons(),
    provideFuse({
      mockApi: {
        delay: 0,
        services: mockApiServices,
      },
      fuse: {
        layout: "classy",
        scheme: "light",
        screens: {
          sm: "600px",
          md: "960px",
          lg: "1280px",
          xl: "1440px",
        },
        theme: "theme-default",
        themes: [
          {
            id: "theme-default",
            name: "Default",
          },
          {
            id: "theme-brand",
            name: "Brand",
          },
          {
            id: "theme-teal",
            name: "Teal",
          },
          {
            id: "theme-rose",
            name: "Rose",
          },
          {
            id: "theme-purple",
            name: "Purple",
          },
          {
            id: "theme-amber",
            name: "Amber",
          },
        ],
      },
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(()=> {
        const database = getDatabase();
        connectDatabaseEmulator(database, 'localhost', 9000);
        return database;
    })
  ],
};
