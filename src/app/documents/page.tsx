"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DocumentUpload } from "@/components/DocumentUpload";
import { DocumentTable } from "@/components/DocumentTable";
import { VersionHistoryModal } from "@/components/VersionHistoryModal";

export default function Documents() {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock documents data
  const documents = [
    {
      id: 1,
      name: "Q4_Financial_Report.pdf",
      version: "v2.1",
      lastModified: "2024-01-15",
      owner: "Sarah Chen",
      size: "2.4 MB",
      type: "PDF",
    },
    {
      id: 2,
      name: "Marketing_Strategy.docx",
      version: "v1.3",
      lastModified: "2024-01-14",
      owner: "Mike Johnson",
      size: "1.8 MB",
      type: "Word",
    },
    {
      id: 3,
      name: "Project_Timeline.xlsx",
      version: "v3.0",
      lastModified: "2024-01-13",
      owner: "Emily Davis",
      size: "856 KB",
      type: "Excel",
    },
    {
      id: 4,
      name: "Design_Mockups.psd",
      version: "v1.0",
      lastModified: "2024-01-12",
      owner: "Alex Wilson",
      size: "15.2 MB",
      type: "Photoshop",
    },
  ];

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewVersionHistory = (document: any) => {
    setSelectedDocument(document);
    setShowVersionHistory(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600 mt-2">Manage your documents and version control</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800">
          New Folder
        </Button>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUpload />
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort
              </Button>
            </div>
          </div>

          <DocumentTable
            documents={filteredDocuments}
            onViewVersionHistory={handleViewVersionHistory}
          />
        </CardContent>
      </Card>

      {/* Version History Modal */}
      <VersionHistoryModal
        document={selectedDocument}
        open={showVersionHistory}
        onOpenChange={setShowVersionHistory}
      />
    </div>
  );
}
