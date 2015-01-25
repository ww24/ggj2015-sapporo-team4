#!/bin/ruby

require 'json'

ASSETS_FILE = 'src/js/assets.js'

images = %w{*.png *jpg}.each_with_object(Hash.new(){|hash, key| hash[key] = [] }) do |type, images|
  Dir.glob("./src/img/**/#{type}") do |file|
    category = file.split('/')[-2]
    images[category] << File.basename(file)
  end
end

assets = []

images.each do |category, images|
  images.each do |image|
    basename = File.basename(image)
    shape = basename.split('_').last.split('.').first
    asset = {
      :src => "img/" + basename,
      :id => basename,
      :bodyType => shape,
      :x => 0,
      :y => 0,
      :fixture => category
    }
    assets << asset
  end
end

puts JSON.generate(assets)
