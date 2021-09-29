# EnumApiField Family
Copyright 2021 Lampada Global

Engage enum based powerful custom field types in order to simplify complex data set loading from database.

## Installing
Download the package located at the folder **installer** and install it through **Module Loader**.
The manifest states accepted sugar versions are 10.* and 11.* once those are the official supported versions, but it should work on version 9.* as well.
After installing it, make sure to run the repair actions **Quick Repair and Rebuild**

## Using
Edit the viewdefs and modify the field definitions of target field following samples code located at the folder **examples**.
Create the Api class according to your requirements and mind the appropriate **reqType** as the following:
| field template      |reqType |
|---------------------|--------|
|enum-api             |GET     |
|enum-parent-api      |GET     |
|enum-mult-parent-api |POST    |

> **Note**: When applying EnumApiField Family to relate fields, make sure to replace the relate field itself with the respective id_name.

After saving viewdefs and Api class, make sure to run the repair actions **Quick Repair and Rebuild** and **Clear Additional Cache**. Finally clear browser cache and enjoy it!
