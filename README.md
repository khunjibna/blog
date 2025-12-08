# My Jekyll Site

This repository contains a Jekyll site that is meant to be served from
`https://khunjibna.github.io/myjekyllsite/`. Building locally normally requires Bundler
to download gems from https://rubygems.org, but the current environment blocks outbound
HTTPS requests, which results in `403 Forbidden` errors when running `bundle install`.

## Quick start

1. Update `_config.yml` to point at the production host:

   ```yml
   url: "https://khunjibna.github.io"
   baseurl: "/myjekyllsite"
   ```

2. From a machine with internet access, run `bundle package --all` in this project to
   download gem tarballs into `vendor/cache/`.
2. Commit or copy the resulting `vendor/cache` directory into this repository (or mount
   it into your container).
3. In the restricted environment, run:

   ```bash
   script/bootstrap
   bundle exec jekyll build --baseurl "/myjekyllsite"
   ```

`script/bootstrap` installs from the cached gems without attempting to reach the
internet. If dependencies are already satisfied, it exits immediately. The `--baseurl`
flag matches the GitHub Pages deployment path and ensures assets resolve correctly when
previewing locally.

## Troubleshooting

- If you still see `Net::HTTPClientException 403 "Forbidden"`, ensure `vendor/cache`
  contains `.gem` files for all gems listed in `Gemfile.lock` and re-run the bootstrap
  script.
- To update dependencies, refresh the cache on a machine with internet access and copy
  the new files back into this environment.
