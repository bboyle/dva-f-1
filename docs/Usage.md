# Form DV1 API usage

This guide is for developers want to use the form with UI tweaks.

## HTML

The application is hosted in a single web page.

| Element            | Description                    |
|--------------------|--------------------------------|
| `#dvfa1-form-view` | Container for holding the form |


### Privacy

Applicants may wish to keep their use of this form private from the people who are abusing them.
No web application can be kept 100% private, but we have made some deliberate choices:

1. No history state management. Users cannot navigate back and forward within this form.
   Unfortunately this may sometimes cause applicants to lose their work and have to start over.
   We accept that issue in favour of preventing a third-party to access all application views
   through the browser history.



## Form submission

Submit data to the [backend API](API.md) to generate a PDF application package.
