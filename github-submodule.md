# GitHub Submodules
Bring one repository into another repository.
Similar to nodejs packages.
Submodules provide access to the whole code instead of just the distribution/executable part of a moduel (e.g. Nodejs)


Similar to SimLink.


Lifecycle:
1. Automatically the submodules are not cloned, there will be any empty shell.
2. Similarly, when you do git pull you, submodules will not be updated automatically.
3. The way to update the submodules is to do that by --recursive-submodueles flag.
4. or update the git config (local or global) submodule.recurse true/false
4. (main*) means new changes are in the sub-module

