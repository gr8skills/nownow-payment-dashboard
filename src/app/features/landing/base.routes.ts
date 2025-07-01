import { Routes } from "@angular/router";

export const LandingPaths = {
  home: "",
  privacyPolicy: "privacy-policy",
  termsOfService: "terms-of-service",
  about: "about",
  contact: "contact",
  faqs: "faqs",
  notFound: "not-found",
  termsOfUse: "terms-of-use",
  cookiePolicy: "cookie-policy",
}

export default [
  {
    path: "",
    loadComponent: () =>
      import("./base.component").then((c) => c.BaseComponent),
    children: [
      {
        path: LandingPaths.home,
        loadComponent: () =>
          import("./features/home/home.component").then((c) => c.HomeComponent),
        data: { title: "home" },
      },
      {
        path: LandingPaths.privacyPolicy,
        loadComponent: () =>
          import("./features/privacy-policy/privacy-policy.component").then(
            (c) => c.PrivacyPolicyComponent,
          ),
        data: { title: "privacy policy" },
      },
      {
        path: LandingPaths.contact,
        loadComponent: () =>
          import("./features/contact-us/contact-us.component").then(
            (c) => c.ContactUsComponent,
          ),
        data: { title: "contact us" },
      },
      {
        path: LandingPaths.home,
        redirectTo: LandingPaths.home,
        pathMatch: "full",
      },
    ],
  },
] as Routes