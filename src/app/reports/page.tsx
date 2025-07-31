"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Reports() {
  const [filters, setFilters] = useState({
    user: "",
    dateFrom: "",
    dateTo: "",
    documentType: "",
    action: "",
  });
  const [reportData, setReportData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock report data
  const mockReportData = [
    {
      id: 1,
      document: "Q4_Financial_Report.pdf",
      action: "Upload",
      user: "Sarah Chen",
      date: "2024-01-15",
      time: "14:30",
      size: "2.4 MB",
    },
    {
      id: 2,
      document: "Marketing_Strategy.docx",
      action: "Edit",
      user: "Mike Johnson",
      date: "2024-01-14",
      time: "09:15",
      size: "1.8 MB",
    },
    {
      id: 3,
      document: "Project_Timeline.xlsx",
      action: "Share",
      user: "Emily Davis",
      date: "2024-01-13",
      time: "16:45",
      size: "856 KB",
    },
    {
      id: 4,
      document: "Design_Mockups.psd",
      action: "Download",
      user: "Alex Wilson",
      date: "2024-01-12",
      time: "11:20",
      size: "15.2 MB",
    },
    {
      id: 5,
      document: "Meeting_Notes.txt",
      action: "Delete",
      user: "Sarah Chen",
      date: "2024-01-11",
      time: "13:10",
      size: "24 KB",
    },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setReportData(mockReportData);
      setIsGenerating(false);
    }, 1500);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    // Simulate export functionality
    const filename = `document_report_${new Date().toISOString().split('T')[0]}.${format}`;
    console.log(`Exporting report as ${format}: ${filename}`);
    
    // In a real application, this would trigger the actual export
    alert(`Report exported as ${format.toUpperCase()}: ${filename}`);
  };

  const getActionBadgeColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'upload':
        return 'bg-green-100 text-green-800';
      case 'edit':
        return 'bg-blue-100 text-blue-800';
      case 'share':
        return 'bg-purple-100 text-purple-800';
      case 'download':
        return 'bg-orange-100 text-orange-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-2">Generate detailed reports on document activity and usage</p>
      </div>

      {/* Report Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="user">User</Label>
              <Select value={filters.user} onValueChange={(value) => setFilters(prev => ({ ...prev, user: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All users</SelectItem>
                  <SelectItem value="sarah">Sarah Chen</SelectItem>
                  <SelectItem value="mike">Mike Johnson</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                  <SelectItem value="alex">Alex Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date From</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">Date To</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentType">Document Type</Label>
              <Select value={filters.documentType} onValueChange={(value) => setFilters(prev => ({ ...prev, documentType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="word">Word Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action">Action</Label>
              <Select value={filters.action} onValueChange={(value) => setFilters(prev => ({ ...prev, action: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All actions</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="edit">Edit</SelectItem>
                  <SelectItem value="share">Share</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full bg-gray-900 hover:bg-gray-800"
              >
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Results */}
      {reportData.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Report Results</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleExport('csv')}>
                  Export CSV
                </Button>
                <Button variant="outline" onClick={() => handleExport('pdf')}>
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Size</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="font-medium text-gray-900">{item.document}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionBadgeColor(item.action)}`}>
                          {item.action}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-700">
                            {item.user.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <span className="text-gray-900">{item.user}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {formatDateTime(item.date, item.time)}
                      </TableCell>
                      <TableCell className="text-gray-600">{item.size}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              Showing {reportData.length} results
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {reportData.length === 0 && !isGenerating && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Report Generated</h3>
            <p className="text-gray-500 mb-4">
              Configure your filters above and click "Generate Report" to view document activity data.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
