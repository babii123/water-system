import axios from 'axios';

export const exportDataExcel = async (type: string) => {
  try {
    // 发送 GET 请求到后端获取数据
    const response = await axios.get(`http://localhost:5000/export/excel/${type}`, {
      responseType: 'blob' // 设置响应类型为 blob
    });

    // 创建下载链接
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-table.xlsx`; // 设置下载文件名
    document.body.appendChild(a);

    // 点击链接进行下载
    a.click();

    // 释放资源
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};