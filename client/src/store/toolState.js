import { makeAutoObservable } from "mobx";

class ToolState {
    tool = null

    constructor() {
        makeAutoObservable(this);
    }

    setTool(tool) {
        if (this.tool === null) {
            this.tool = tool;
            this.setFillColor(this.fillColor);
            this.setStrokeColor(this.strokeColor);
        }
        this.tool = tool;
    }

    setFillColor(color) {
        if (this.tool === null) return this.fillColor = color;
        this.tool.fillColor = color;
    }

    setStrokeColor(color) {
        if (this.tool === null) return this.strokeColor = color;
        this.tool.strokeColor = color;
    }

    setLineWidth(width) {
        this.tool.lineWidth = width;
    }
}

export default new ToolState();