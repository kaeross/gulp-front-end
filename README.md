# Gulp-front-end
A Gulp build process to prepare a website for deployment.

## Getting Started

### Installing

To install dependancies run in command line

```
npm install
```

### Scripts and Styles

Concatenate, minify and copy project files into 'all.min.js'
```
gulp scripts
```

Compile SCSS files into CSS, then concatenate and minify into an all.min.css file which is copied to dist/styles folder

```
gulp styles
```
The source maps will be generated for JS and CSS files.

### Images

Optimise size of the project’s JPEG and PNG files, copy to dist/content folder

```
gulp images
```

### Clean

Delete all files and folders in the dist folder

```
gulp clean
```

### Build

Run the clean, scripts, styles, and images tasks. Clean task completes before other commands.

```
gulp build
```


## Deployment

Run the default task to serve project on local web server

```
gulp
```

Gulp will watch for any changes to any scss files and will update project on save and reload live in the browser.


## Authors

* **Kate Ross** - *Initial work* - [Kaeross](https://github.com/kaeross)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

