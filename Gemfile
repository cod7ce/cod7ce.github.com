# frozen_string_literal: true

source "https://rubygems.org"

gem "jekyll-theme-chirpy", "~> 7.6"

# Keeps the pre-2026 post URLs alive by emitting redirect stubs.
gem "jekyll-redirect-from", "~> 0.16"

gem "html-proofer", "~> 5.0", group: :test

platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.2.0", :platforms => [:windows]
