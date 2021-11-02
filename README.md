# DIARIUM APP

## Database

- Number of edits?

## General

- Flush all when logging out
- (Re)moving DB while logged in
  - Check for DB on every backend OP?
  - Handle errors properly (show user a message that action x could not be completed)
- Open App centered with a specific width and height
  - On successful login -> resize window to fit screen
- Navigation while in edit mode
  - Find out what happens
    - Try to fool-proof (error handling)
  - Disable all navigation while in edit mode
    - Calendar
    - Links
    - Today

## Shortcuts

## Settings / Preferences

- Editor
  - Markdown or WYSIWYG
  - Markdown Preview
    - No preview?
    - Vertical / Horizontal splitting
  - Hide / Replace "Wow, such empty" message

## Nav

## Search

- Fulltext AND tags?
- Problem: text/content is encrypted
  - Solution 1: After login, show little progressbar and decrypt all entries in the background
    - Store them in memory? :/
    - Store them in DB and delete them from DB upon clicking "Logout"?
- Searchresults
  - big dropdown with results
    - date, few lines content, tags

## Mood Heatmap

- Need custom classes for calendar
- Need custom menu for Editor
  - Alternative: Via custom tags

## Calendar

- Changing month should auto-select 1st of month(?)
  - Entering edit mode / creating a record should jump to given date
- Bug: Next / Prev not working?
  - Sometimes it skips a month (october 2021)

## Editor

- Save status should update dynamically
  - Fix timestamps (<https://knexjs.org/#Schema-timestamp>)
- Image "upload" (not base64)
- Multimedia support
  - Audio
  - Video
  - Embeds
- Customs
  - Current time separator  --- 01:25 ---

## Content View

## Tags/Labels

- Which
  - Vacation
  - Sickness
  - Highlight
  - NSFW (content should be blurred)
  - Custom tags? (For search)

## Stats (Sidebar)

- Current entry
  - Last edited
  - Created
- Entries in current year (with progressbar / percent)
- Entries in current month (with progressbar / percent)
- Overall entries

## Stats +

- Biggest / Longest entry
- Best strike (x entries in a row)
- First most negative / positive rating for day (mood heatmap)

## Linking

- We don't have a URL (visible)
- Force calendar into "month" view?
- /YEAR/MONTH/DAY links should link to specific day
  - client side routing may be good enough
  - hash routing: <https://github.com/ItalyPaleAle/svelte-spa-router>

## Login

## Logout

- Flush secret and other user data
- Switch to Login screen
