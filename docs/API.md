# Form DV1 API documentation

Send data to the URL below in order to generate and download an application package named `prepared1-submission.pdf` containing:

- instructions to print, sign and lodge the application
- confidential forms (addresses and other contact details)
- the DV1 application form.

The PDF forms can be edited in Adobe Acrobat, or printed and edited by hand.
The application must be printed, signed (in front of a witness) and lodged in a magistrates court.
Online applications are not currently available.


## History

| Version    | Date       | Status         | Comment                                                            |
|------------|------------|----------------|--------------------------------------------------------------------|
| v1.0-alpha | 2016-03-24 | In development | Implementation details are subject to change. Feedback is welcome. |
| v1.0       | 2016-04-22 | Target launch  | Tentative launch date.                                             |


## Recommended usage

```html
<form
 method="POST"
 target="_blank"
 action="https://test.smartservice.qld.gov.au/services/submissions/pdf/yrcl/prepared1">

	<button type="submit">Download application forms</button>

</form>
```

This will download blank application forms.
You can prefill fields by supplying data in the [parameters](#parameters) listed below.

`target="_blank"` is recommended to open a new tab. If a server error occurs, the applicant will not lose their form data.


## URL

https://test.smartservice.qld.gov.au/services/submissions/pdf/yrcl/prepared1

| Method   | Status      | Description                                                                            |
|----------|-------------|----------------------------------------------------------------------------------------|
| **POST** | Recommended | Best choice for sending applicant data privately (will not appear in browser history). |
| GET      | Supported   | Applicant data will be displayed in the URL and browser history (not recommended).     |


## Response codes

| Code | Status                 | Type                               | Description                                          |
|------|------------------------|------------------------------------|------------------------------------------------------|
| 200  | OK                     | application/pdf;charset=ISO-8859-1 | File named *prepared1-submission.pdf* will download. |
| 500  | Failed to render pdf … | text/html                          | Invalid data or template error (on the server)       |


## Parameters

All parameters are optional. Supplied data will be used to prefill the PDF form.
Blank fields can still be completed by the applicant by:

- filling out the PDF form, or
- writing on the printed application.


### Configuration parameters

| Name                          | Description                           | Type              | Notes |
|-------------------------------|---------------------------------------|-------------------|-------|
| aggrievedAddressConfidential  | Treat address as confidential         | `true` or `false` | If true, `aggrievedAddress` will not be printed on the Form DV1 pages. It will be included on separate pages are part of a confidential address form. |
| aggrievedContactConfidential  | Treat contact details as confidential | `true` or `false` | If true, phone numbers and email address will not be printed on the Form DV1 pages. It will be included on separate pages are part of a confidential address form. |


### Form DV1 fields

| Name                 | Description          | Type | Notes |
|----------------------|----------------------|------|-------|
| aggrievedNameGiven   | First name(s)        | Text | -     |
| aggrievedNameFamily  | Family/surname       | Text | -     |
| aggrievedDateBirth   | Date of birth        | Text | Preferred format: dd/mm/yyyy |
| aggrievedAddress     | Postal address       | Text | Postal address for contacting aggrieved. Printed as a single line on the PDF. |
| aggrievedGender      | Gender identity      | Text | Free text |
| aggrievedPhoneHome   | Home phone number    | Text | Preferred format: (07) #### #### |
| aggrievedPhoneMobile | Mobile phone number  | Text | Preferred format: 04## ### ###   |
| aggrievedPhoneWork   | Work phone number    | Text | Preferred format: (07) #### #### or mobile 04## ### ### |
| aggrievedPhoneEmail  | Email address        | Text | Printed on PDF. No automated emails are sent. |
