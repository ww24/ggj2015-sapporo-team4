#!/bin/ruby

require 'json'

ASSETS_FILE = 'src/js/assets.js'

images = %w{*.png *jpg}.each_with_object([]) do |type, images|
  images.concat(Dir.glob("./src/img/**/#{type}"))
end

assets = images.each_with_object([]) do |image, assets|
  basename = File.basename(image)
  asset = {
    :src => "img/" + basename,
    :id => basename
  }
  assets << asset
end

contents = <<EOS
  var Assets = #{assets.to_json};
  module.exports = Assets;
EOS

open(ASSETS_FILE, 'w').puts(contents)
puts "wrote to #{ASSETS_FILE}"
