
---

# Image Compression and Caching Library

This library provides an easy way to compress images and cache them in IndexedDB, with options to control compression settings. Once an image is cached, future loads retrieve it directly from IndexedDB, improving load times.

## Installation

Install the library with:

```bash
npm install cached-image-optimizer
```

## Usage

### Import and Configure the Component

Use the `CompressCacheImage` component to add optimized images to your project.

### Basic Example

The `image` and `name` props are required for this component. If you omit either of these, the library will not function as expected. The `name` prop is used as a unique key to store and retrieve the image from IndexedDB. Without it, the component will not be able to properly cache and load images from IndexedDB.

```javascript
import React from 'react';
import CompressCacheImage from 'cached-image-optimizer';
import SampleImage from '../assets/sample-image.png';

const App = () => (
  <div>
  {/* Replace <img /> tag with <CompressCacheImage /> to optimise images*/}
    <CompressCacheImage
      image={SampleImage} // Required: The image file to optimize and cache
      name="sampleImage"  // Required: Unique key for storing this image in IndexedDB
    />
  </div>
);

export default App;
```

### Props

- **`image`** (required): Image file imported from assets.
- **`name`** (required): Unique key for storing the image in IndexedDB. The `name` prop is critical because it allows the library to store and retrieve the image efficiently from IndexedDB. Without it, caching and retrieval will not function.
- **`ImageCompression`** (optional, default: `true`): Set to `false` to store the original image without compression.
- **`width`** and **`height`** (optional): Set the width and height of the displayed image.
- **`style`** (optional): Pass a custom style object to apply additional CSS styling directly to the image.
- **`alt`** (optional, default: `name`): Alt text for the image, which will be used for accessibility and SEO purposes. If not provided, it defaults to the `name` value.
- **`onClick`** (optional): A click handler function that can be applied to the image.
- **`className`** (optional): CSS class name that can be added to the image element for styling or additional functionality.
- **`placeholder`** (optional): URL for a placeholder image that displays while the main image is loading. Use this to provide a low-resolution image or a loading indicator.
- **`compressionSettings`** (optional): Object with properties `maxWidthOrHeight` and `quality` to control image compression settings. The default values are `{ maxWidthOrHeight: 1920, quality: 0.8 }`.

### Example with Options

```javascript
import React from 'react';
import CompressCacheImage from 'cached-image-optimizer';

import SampleImage from '../assets/sample-image.png';
import SampleImage2 from '../assets/sample-image2.png';

const App = () => (

  const handleImageClick = () => {
    alert("Image clicked!");
  };

  <div>
  {/* Replace <img /> tag with <CompressCacheImage /> to optimise images*/}
    <CompressCacheImage
      image={SampleImage}
      name="sampleImage"
      ImageCompression={true}
      width="200px"
      height="200px"
      alt= "alt"
      onClick={handleImageClick} // Adding onClick handler to image
      className="custom-image-class" // Applying a custom class for styling
      placeholder="/path/to/placeholder.jpg" // Displayed while loading the main image
      compressionSettings={{ maxWidthOrHeight: 1024, quality: 0.7 }} // Custom compression settings
    />
    <CompressCacheImage
      image={SampleImage2}
      name="sampleImage2"
      ImageCompression={false}
      width="200px"
      height="200px"
      alt= "alt"
      style={{ boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}
      placeholder="/path/to/placeholder.jpg" // Displayed while loading the main image
      compressionSettings={{ maxWidthOrHeight: 1024, quality: 0.7 }} // Custom compression settings
    />
  </div>
);

export default App;
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- **Ajinkya Pande** - *Initial work* - [ajinkyapande98@gmail.com](mailto:ajinkyapande98@gmail.com)

## Contributors

Feel free to contribute to this project!
---
