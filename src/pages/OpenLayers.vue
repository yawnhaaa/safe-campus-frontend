<script>
import "ol/ol.css";
import {Tile as TileLayer} from "ol/layer";
import XYZ from "ol/source/XYZ";
import {defaults as defaultControls} from "ol/control";
import Map from "ol/Map.js";
import View from "ol/View.js";
import Feature from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Point} from "ol/geom";
import {Icon, Style} from "ol/style";
import {Select} from "ol/interaction";
import {request} from "@/api/request";

export default {
  data() {
    return {
      map: null,
      parser: null,
      vecUrl: "http://t{0-7}.tianditu.com/DataServer?x={x}&y={y}&l={z}&T=vec_c&tk=",
      cvaUrl: "http://t{0-7}.tianditu.com/DataServer?x={x}&y={y}&l={z}&T=cva_c&tk=",
      tk: "deb6e57238f26e3bcedafc6066b473bf",
      projection: "EPSG:4326",
      pointList: '',
      pointList2: [
        {
          "id": 42,
          "point": [
            120.57967185974123,
            30.324063604267153
          ]
        },
        {
          "id": 41,
          "point": [
            120.59563636779787,
            30.29657323383411
          ]
        },
        {
          "id": 40,
          "point": [
            120.45435905456543,
            30.299092887890204
          ]
        }
      ],
      detail: '',
      selectInteraction: null,
      detailShow: false,
    };
  },
  async mounted() {
    await this.getPoliceList()
    this.initMap();
    this.initSelectInteraction()
  },
  methods: {
    getPoliceList() {
      request.get("/getPoliceList").then(res => {
        if (res.data.code === 200) {
          this.pointList = res.data.data
        }
      }).then(() => {
        this.addPointFeature(); // 添加要素
      }).catch(() => {
        this.pointList = this.pointList2
      })
    },
    getPoliceById(id) {
      request.get("/getPoliceById/" + id).then(res => {
        this.detail = res.data.data
      })
    },
    initMap() {
      this.map = new Map({
        target: "olMap",
        view: new View({
          center: [120, 30], //中心点经纬度
          zoom: 7, //图层缩放大小
          maxZoom: 18,
          minZoom: 5,
          projection: "EPSG:4326",
        }),
        controls: defaultControls({
          zoom: true,
          attribution: false,
          rotate: false,
        }),
      });
      // 添加地图
      const vecLayer = new TileLayer({
        source: new XYZ({
          url: this.vecUrl + this.tk,
          projection: this.projection,
        }),
      });
      this.map.addLayer(vecLayer);
      // 添加注记
      const cvaLayer = new TileLayer({
        source: new XYZ({
          url: this.cvaUrl + this.tk,
          projection: this.projection,
        }),
      });
      this.map.addLayer(cvaLayer);

      this.vecSource = new VectorSource();
      this.vecLayer = new VectorLayer({
        source: this.vecSource,
      });
      this.map.addLayer(this.vecLayer); // 将矢量图层添加到地图
    },
    addPointFeature() {
      this.pointList.forEach((point) => {
        const pointFeature = new Feature({
          geometry: new Point(point.point),
          id: point.id
        });
        // 定义样式
        const pointStyle = new Style({
          image: new Icon({
            // anchor: [5, 1], // 图标锚点位于底部中心
            anchor: [0.5, 0.96],
            src: "/lp-pt.png", // 自定义图标路径
            scale: 0.7, // 图标缩放比例
          }),
        });

        pointFeature.setStyle(pointStyle);
        this.vecSource.addFeature(pointFeature); // 将点要素添加到矢量图层
      })
    },
    initSelectInteraction() {
      this.selectInteraction = new Select();
      this.map.addInteraction(this.selectInteraction);

      this.selectInteraction.on('select', (event) => {
        const selectedFeatures = event.target.getFeatures();

        if (selectedFeatures.getLength() > 0) {
          const feature = selectedFeatures.item(0).values_
          const selectedFeature = selectedFeatures.item(0);
          this.highlightSelectedFeature(selectedFeature); // 调用高亮选定要素的方法
          this.detailShow = true
          this.getPoliceById(feature.id)
        } else {
          this.detailShow = false
        }
      });
    },
    highlightSelectedFeature(feature) {
      const selectedStyle = new Style({
        image: new Icon({
          anchor: [0.5, 0.96],
          src: "/lp-pt-ed.png", // 设置自定义图标路径
          scale: 0.7,
        }),
      });
      feature.setStyle(selectedStyle);
    }
  },
};
</script>

<template>
  <div class="contain">
    <div class="detail-contain" v-show="detailShow">
      <div class="name">{{ detail.name }}</div>
      <div class="address">{{ detail.address }}</div>
      <div class="intro">
        {{ detail.intro }}
      </div>
      <div class="tel">{{ detail.tel }}</div>
    </div>
    <div class="wrapper">
      <div class="map" id="olMap"></div>
    </div>
  </div>
</template>

<style scoped>
.contain {
  position: relative;
  width: 100%;
  height: 100%;

  .detail-contain {
    position: absolute;
    color: white;
    padding: 20px;
    border-radius: 5px;
    background: #1fa6f4; /* Added background color */
    top: 20px;
    right: 20px; /* Adjusted to be at the right */
    z-index: 1;

    div {
      max-width: 200px;
      border-radius: 5px;
      text-align: center;
      margin: 10px 0;
      background: #153fc7;
      padding: 5px;
    }
  }
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
}

</style>
