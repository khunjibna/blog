# My Jekyll Site

This repository contains a Jekyll site. Building locally normally requires Bundler to
download gems from https://rubygems.org, but the current environment blocks outbound
HTTPS requests, which results in `403 Forbidden` errors when running `bundle install`.

## Quick start

1. From a machine with internet access, run `bundle package --all` in this project to
download gem tarballs into `vendor/cache/`.
2. Commit or copy the resulting `vendor/cache` directory into this repository (or mount
   it into your container).
3. In the restricted environment, run:

   ```bash
   script/bootstrap
   bundle exec jekyll build
   ```

`script/bootstrap` installs from the cached gems without attempting to reach the
internet. If dependencies are already satisfied, it exits immediately.

## Troubleshooting

- If you still see `Net::HTTPClientException 403 "Forbidden"`, ensure `vendor/cache`
  contains `.gem` files for all gems listed in `Gemfile.lock` and re-run the bootstrap
  script.
- To update dependencies, refresh the cache on a machine with internet access and copy
  the new files back into this environment.
