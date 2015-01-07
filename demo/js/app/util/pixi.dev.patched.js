/**
 * pixi.dev.patched.js
 *
 * Provides a patched version of pixi.dev with a fix for an issue with the drawRoundedRect method, see
 * <a href="https://github.com/GoodBoyDigital/pixi.js/issues/1209">https://github.com/GoodBoyDigital/pixi.js/issues/1209</a>.
 *
 * This should be removed after the bug has been fixed.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07/01/15
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev");

    // jshint maxstatements: 100
    PIXI.WebGLGraphics.buildRoundedRectangle = function (graphicsData, webGLData) {
        var rrectData = graphicsData.shape,
            x = rrectData.x,
            y = rrectData.y,
            width = rrectData.width,
            height = rrectData.height,
            radius = rrectData.radius,
            recPoints = [],
            color,
            alpha,
            r,
            g,
            b,
            verts,
            indices,
            vecPos,
            triangles,
            i,
            tempPoints;

        recPoints.push(x, y + radius);
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(
                x, y + height - radius, x, y + height, x + radius, y + height));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(
                x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(
                x + width, y + radius, x + width, y, x + width - radius, y));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(
                x + radius, y, x, y, x, y + radius));

        if (graphicsData.fill) {
            color = PIXI.hex2rgb(graphicsData.fillColor);
            alpha = graphicsData.fillAlpha;
            r = color[0] * alpha;
            g = color[1] * alpha;
            b = color[2] * alpha;
            verts = webGLData.points;
            indices = webGLData.indices;
            vecPos = verts.length/6;

            // this is the hack to fix the issue
            recPoints[recPoints.length-1]-= 0.000001;

            triangles = PIXI.PolyK.Triangulate(recPoints);

            for (i = 0; i < triangles.length; i += 3) {
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i+1] + vecPos);
                indices.push(triangles[i+2] + vecPos);
                indices.push(triangles[i+2] + vecPos);
            }

            for (i = 0; i < recPoints.length; i++) {
                verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
            }
        }

        if (graphicsData.lineWidth) {
            tempPoints = graphicsData.points;

            graphicsData.points = recPoints;

            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

            graphicsData.points = tempPoints;
        }
    };

    return PIXI;
});