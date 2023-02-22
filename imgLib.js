'use strict';

export class ImgLib {
    sourcerer;

    constructor (sourcerer) {
        this.sourcerer = sourcerer;
    }

    toBitMap = (image) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.sourcerer.width;
        canvas.height = this.sourcerer.height;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(image, 0, 0, this.sourcerer.width, this.sourcerer.height);
        return Uint8Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
    }
    
    fromBitMap = (bitMap) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.sourcerer.width;
        canvas.height = this.sourcerer.height;
        // Disable image smoothing to get non-blury pixel values
        ctx.imageSmoothingEnabled = false;
        // Create Image element
        let imgData = ctx.createImageData(this.sourcerer.width, this.sourcerer.height);
        // Set imgArray as image source
        imgData.data.set(new Uint8ClampedArray(bitMap), 0);
        // Set image data in canvas
        ctx.putImageData(imgData, 0, 0);
        // Set canvas as image source
        let image = new Image();
        image.src = canvas.toDataURL();
        return image;
    }
}