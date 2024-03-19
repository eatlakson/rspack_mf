# A very small test application for demonstrating issue with shared libraries in ModuleFederation v1.5 + RSPack

The current setup is:

The host is defined as the `host`, it consumes two remotes: `remote` and `mf-user-context`.
`mf-user-context` is hosted by the hosts web server, but built by a separate repack.config.js file so as to have a completely isolated rspack runtime from the host. (Ideally, the host would expose the user-context as a container (via the rspack ContainerPlugin), however, MF v1.5 only allows one container per rspack runtime)

1. install the dependencies: `yarn`
2. build the packages: `yarn build`
3. start the server: `yarn start`
4. navigate to [http://localhost/](http://localhost/)
5. open dev tools, and on the network tab, ensure "Disable cache" is checked
6. repeatably refresh the browser - and note that ~20% of the time react is loaded twice, which breaks hooks and causes the app to fail to load

The issue can be mysteriously fixed by making a small change.

1. in `remote/rspack.config.js` uncomment line 57 which defines `@mf/user-context` as a remote.
2. now after building and starting, the user-context is shared by both the host and the remote, and the ctx value displayed is the same
3. also repeatably refreshing the browser does not result in react being loaded twice
