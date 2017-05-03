'use strict';
var core_1 = require('@angular/core');
var SignaturePad = (function () {
    function SignaturePad(elementRef) {
        // no op
        this.elementRef = elementRef;
        this.options = this.options || {};
        this.onBeginEvent = new core_1.EventEmitter();
        this.onEndEvent = new core_1.EventEmitter();
    }
    SignaturePad.prototype.ngAfterContentInit = function () {
        var sp = require('signature_pad');
        var canvas = this.elementRef.nativeElement.querySelector('canvas');
        if (this.options['canvasHeight']) {
            canvas.height = this.options['canvasHeight'];
        }
        if (this.options['canvasWidth']) {
            canvas.width = this.options['canvasWidth'];
        }
        this.signaturePad = new sp(canvas, this.options);
        this.signaturePad.onBegin = this.onBegin.bind(this);
        this.signaturePad.onEnd = this.onEnd.bind(this);
    };
    SignaturePad.prototype.resizeCanvas = function () {
        // When zoomed out to less than 100%, for some very strange reason,
        // some browsers report devicePixelRatio as less than 1
        // and only part of the canvas is cleared then.
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        var canvas = this.signaturePad._canvas;
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
    };
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible paramters)
    SignaturePad.prototype.toDataURL = function (imageType, quality) {
        return this.signaturePad.toDataURL(imageType, quality); // save image as data URL
    };
    // Draws signature image from data URL
    SignaturePad.prototype.fromDataURL = function (dataURL) {
        this.signaturePad.fromDataURL(dataURL);
    };
    // Clears the canvas
    SignaturePad.prototype.clear = function () {
        this.signaturePad.clear();
    };
    // Returns true if canvas is empty, otherwise returns false
    SignaturePad.prototype.isEmpty = function () {
        return this.signaturePad.isEmpty();
    };
    // Unbinds all event handlers
    SignaturePad.prototype.off = function () {
        this.signaturePad.off();
    };
    // Rebinds all event handlers
    SignaturePad.prototype.on = function () {
        this.signaturePad.on();
    };
    // set an option on the signaturePad - e.g. set('minWidth', 50);
    SignaturePad.prototype.set = function (option, value) {
        switch (option) {
            case 'canvasHeight':
                this.signaturePad._canvas.height = value;
                break;
            case 'canvasWidth':
                this.signaturePad._canvas.width = value;
                break;
            default:
                this.signaturePad[option] = value;
        }
    };
    // notify subscribers on signature begin
    SignaturePad.prototype.onBegin = function () {
        this.onBeginEvent.emit(true);
    };
    // notify subscribers on signature end
    SignaturePad.prototype.onEnd = function () {
        this.onEndEvent.emit(true);
    };
    SignaturePad.decorators = [
        { type: core_1.Component, args: [{
                    template: '<canvas></canvas>',
                    selector: 'signature-pad',
                },] },
    ];
    /** @nocollapse */
    SignaturePad.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    SignaturePad.propDecorators = {
        'options': [{ type: core_1.Input },],
        'onBeginEvent': [{ type: core_1.Output },],
        'onEndEvent': [{ type: core_1.Output },],
    };
    return SignaturePad;
}());
exports.SignaturePad = SignaturePad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXBhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpZ25hdHVyZS1wYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIscUJBQW1FLGVBQWUsQ0FBQyxDQUFBO0FBTW5GO0lBU0Usc0JBQVksVUFBc0I7UUFDaEMsUUFBUTtRQUNSLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSx5Q0FBa0IsR0FBekI7UUFDRSxJQUFJLEVBQUUsR0FBUSxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkMsSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXhFLEVBQUUsQ0FBQyxDQUFPLElBQUksQ0FBQyxPQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU0sQ0FBQyxNQUFNLEdBQVMsSUFBSSxDQUFDLE9BQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQU8sSUFBSSxDQUFDLE9BQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUMsT0FBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELENBQUM7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFP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QWU7aUJBQzFCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUE2RDtRQUNsRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO0tBQ25CLENBQUM7SUFDSywyQkFBYyxHQUEyQztRQUNoRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUM3QixjQUFjLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUNuQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtLQUNoQyxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBbkhELElBbUhDO0FBbkhZLG9CQUFZLGVBbUh4QixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNpZ25hdHVyZVBhZCB7XHJcblxyXG4gICBwdWJsaWMgb3B0aW9uczogT2JqZWN0O1xyXG4gICBwdWJsaWMgb25CZWdpbkV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XHJcbiAgIHB1YmxpYyBvbkVuZEV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XHJcblxyXG4gIHByaXZhdGUgc2lnbmF0dXJlUGFkOiBhbnk7XHJcbiAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAvLyBubyBvcFxyXG4gICAgdGhpcy5lbGVtZW50UmVmID0gZWxlbWVudFJlZjtcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMub25CZWdpbkV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gICAgdGhpcy5vbkVuZEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgIGxldCBzcDogYW55ID0gcmVxdWlyZSgnc2lnbmF0dXJlX3BhZCcpO1xyXG4gICAgbGV0IGNhbnZhczogYW55ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJyk7XHJcblxyXG4gICAgaWYgKCg8YW55PnRoaXMub3B0aW9ucylbJ2NhbnZhc0hlaWdodCddKSB7XHJcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSAoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNIZWlnaHQnXTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKDxhbnk+dGhpcy5vcHRpb25zKVsnY2FudmFzV2lkdGgnXSkge1xyXG4gICAgICBjYW52YXMud2lkdGggPSAoPGFueT50aGlzLm9wdGlvbnMpWydjYW52YXNXaWR0aCddO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkID0gbmV3IHNwKGNhbnZhcywgdGhpcy5vcHRpb25zKTtcclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uQmVnaW4gPSB0aGlzLm9uQmVnaW4uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uRW5kID0gdGhpcy5vbkVuZC5iaW5kKHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2l6ZUNhbnZhcygpOiB2b2lkIHtcclxuICAgIC8vIFdoZW4gem9vbWVkIG91dCB0byBsZXNzIHRoYW4gMTAwJSwgZm9yIHNvbWUgdmVyeSBzdHJhbmdlIHJlYXNvbixcclxuICAgIC8vIHNvbWUgYnJvd3NlcnMgcmVwb3J0IGRldmljZVBpeGVsUmF0aW8gYXMgbGVzcyB0aGFuIDFcclxuICAgIC8vIGFuZCBvbmx5IHBhcnQgb2YgdGhlIGNhbnZhcyBpcyBjbGVhcmVkIHRoZW4uXHJcbiAgICBjb25zdCByYXRpbzogbnVtYmVyID0gTWF0aC5tYXgod2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMSwgMSk7XHJcbiAgICBjb25zdCBjYW52YXM6IGFueSA9IHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXM7XHJcbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMub2Zmc2V0V2lkdGggKiByYXRpbztcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0ICogcmF0aW87XHJcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5zY2FsZShyYXRpbywgcmF0aW8pO1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTsgLy8gb3RoZXJ3aXNlIGlzRW1wdHkoKSBtaWdodCByZXR1cm4gaW5jb3JyZWN0IHZhbHVlXHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm5zIHNpZ25hdHVyZSBpbWFnZSBhcyBkYXRhIFVSTCAoc2VlIGh0dHBzOi8vbWRuLmlvL3RvZGF0YXVybCBmb3IgdGhlIGxpc3Qgb2YgcG9zc2libGUgcGFyYW10ZXJzKVxyXG4gIHB1YmxpYyB0b0RhdGFVUkwoaW1hZ2VUeXBlPzogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLnNpZ25hdHVyZVBhZC50b0RhdGFVUkwoaW1hZ2VUeXBlLCBxdWFsaXR5KTsgLy8gc2F2ZSBpbWFnZSBhcyBkYXRhIFVSTFxyXG4gIH1cclxuXHJcbiAgLy8gRHJhd3Mgc2lnbmF0dXJlIGltYWdlIGZyb20gZGF0YSBVUkxcclxuICBwdWJsaWMgZnJvbURhdGFVUkwoZGF0YVVSTDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICB0aGlzLnNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChkYXRhVVJMKTtcclxuICB9XHJcblxyXG4gIC8vIENsZWFycyB0aGUgY2FudmFzXHJcbiAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQuY2xlYXIoKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgdHJ1ZSBpZiBjYW52YXMgaXMgZW1wdHksIG90aGVyd2lzZSByZXR1cm5zIGZhbHNlXHJcbiAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zaWduYXR1cmVQYWQuaXNFbXB0eSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5iaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcclxuICBwdWJsaWMgb2ZmKCk6IHZvaWQge1xyXG4gICAgdGhpcy5zaWduYXR1cmVQYWQub2ZmKCk7XHJcbiAgfVxyXG5cclxuICAvLyBSZWJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xyXG4gIHB1YmxpYyBvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuc2lnbmF0dXJlUGFkLm9uKCk7XHJcbiAgfVxyXG5cclxuICAvLyBzZXQgYW4gb3B0aW9uIG9uIHRoZSBzaWduYXR1cmVQYWQgLSBlLmcuIHNldCgnbWluV2lkdGgnLCA1MCk7XHJcbiAgcHVibGljIHNldChvcHRpb246IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG5cclxuICAgIHN3aXRjaCAob3B0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2NhbnZhc0hlaWdodCc6XHJcbiAgICAgICAgdGhpcy5zaWduYXR1cmVQYWQuX2NhbnZhcy5oZWlnaHQgPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnY2FudmFzV2lkdGgnOlxyXG4gICAgICAgIHRoaXMuc2lnbmF0dXJlUGFkLl9jYW52YXMud2lkdGggPSB2YWx1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLnNpZ25hdHVyZVBhZFtvcHRpb25dID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBub3RpZnkgc3Vic2NyaWJlcnMgb24gc2lnbmF0dXJlIGJlZ2luXHJcbiAgcHVibGljIG9uQmVnaW4oKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQmVnaW5FdmVudC5lbWl0KHRydWUpO1xyXG4gIH1cclxuXHJcbiAgLy8gbm90aWZ5IHN1YnNjcmliZXJzIG9uIHNpZ25hdHVyZSBlbmRcclxuICBwdWJsaWMgb25FbmQoKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uRW5kRXZlbnQuZW1pdCh0cnVlKTtcclxuICB9XHJcbnN0YXRpYyBkZWNvcmF0b3JzOiBEZWNvcmF0b3JJbnZvY2F0aW9uW10gPSBbXG57IHR5cGU6IENvbXBvbmVudCwgYXJnczogW3tcclxuICB0ZW1wbGF0ZTogJzxjYW52YXM+PC9jYW52YXM+JyxcclxuICBzZWxlY3RvcjogJ3NpZ25hdHVyZS1wYWQnLFxyXG59LCBdIH0sXG5dO1xuLyoqIEBub2NvbGxhcHNlICovXG5zdGF0aWMgY3RvclBhcmFtZXRlcnM6ICh7dHlwZTogYW55LCBkZWNvcmF0b3JzPzogRGVjb3JhdG9ySW52b2NhdGlvbltdfXxudWxsKVtdID0gW1xue3R5cGU6IEVsZW1lbnRSZWYsIH0sXG5dO1xuc3RhdGljIHByb3BEZWNvcmF0b3JzOiB7W2tleTogc3RyaW5nXTogRGVjb3JhdG9ySW52b2NhdGlvbltdfSA9IHtcbidvcHRpb25zJzogW3sgdHlwZTogSW5wdXQgfSxdLFxuJ29uQmVnaW5FdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG4nb25FbmRFdmVudCc6IFt7IHR5cGU6IE91dHB1dCB9LF0sXG59O1xufVxyXG5cbmludGVyZmFjZSBEZWNvcmF0b3JJbnZvY2F0aW9uIHtcbiAgdHlwZTogRnVuY3Rpb247XG4gIGFyZ3M/OiBhbnlbXTtcbn1cbiJdfQ==