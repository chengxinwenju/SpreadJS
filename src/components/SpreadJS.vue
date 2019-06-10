<template>
  <div>
    <h1>Spread.Sheets</h1>
    <div>
      <input type='file' @change="processFile($event)"/>
      <button @click="importExcel">导入</button>
      <button @click="exportExcel">导出</button>
      <button @click="printWorkbook">打印</button>
    </div>
    <div style="text-align: left">
      <gc-spread-sheets
        hostClass='spread-host'
        @workbookInitialized='workbookInitialized($event)'>
        <gc-worksheet>
        </gc-worksheet>
      </gc-spread-sheets>
    </div>
  </div>
</template>

<script>
  import layer from 'layui-layer';
  /* eslint-disable */

  import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
  import GC from "@grapecity/spread-sheets";
  import "@grapecity/spread-sheets-vue";
  import "@grapecity/spread-sheets-resources-zh";
  import ExcelIO from "@grapecity/spread-excelio";
  import FaverSaver from "file-saver";
  import "@grapecity/spread-sheets-print";

  GC.Spread.Common.CultureManager.culture("zh-cn");
  // GC.Spread.Sheets.LicenseKey = ExcelIO.LicenseKey = "your key";

  export default {
    created() {
      this.openLayUi();
    },
    methods: {
      processFile(event) {
        this.excelFile = event.target.files[0];
      },
      importExcel() {
        var excelIO = new ExcelIO.IO();
        console.log(excelIO);
        var self = this;
        excelIO.open(this.excelFile, function (json) {
          self.spread.fromJSON(json);
          console.log(json);
        });
      },
      exportExcel() {
        var excelIO = new ExcelIO.IO();
        var json = this.spread.toJSON();
        excelIO.save(
          json,
          function (blob) {
            FaverSaver.saveAs(blob, "export.xlsx");
          },
          function (e) {
            console.log(e);
          }
        );
      },
      printWorkbook() {
        this.spread.print();
      },
      workbookInitialized(spread) {
        this.spread = spread;
        spread.refresh();
      },
      openLayUi() {
        layer.open({
          //此处以iframe举例
          type: 1,
          title: "单据详情",
          area: ['660px', '500px'],
          shade: 0,//遮罩透明度
          maxmin: true, //允许全屏最小化
          anim: -1, //0-6的动画形式，-1不开启
          content: $('#lay'),
          zIndex: layer.zIndex,//重点1
          success: function (layero) {
            layer.setTop(layero); //重点2
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spread-host {
    width: 100%;
    height: 400px;
    border: 1px solid black;
  }
</style>
