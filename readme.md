# super simple trello csv to asana csv converter

1. upgrade your trello team (just the trial if you can)
2. export your board to csv
3. `$ node index.js '/Users/tim/Downloads/trello_csvs/abcd - trello-board.csv'`
4. upload `out.csv` as a new asana project

creates all cards & columns (as secctions).  pulls in labels as a custom field.

caveat: asana doesn't yet support multi-value custom fields so if you have multiple labels applied to the same card (e.g. "High", "Low") you'll end up with a smooshed values (e.g. "High", "Low", "High, Low").
