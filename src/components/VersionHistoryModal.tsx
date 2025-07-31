"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Document {
  id: number;
  name: string;
  version: string;
  lastModified: string;
  owner: string;
  size: string;
  type: string;
}

interface VersionHistoryModalProps {
  document: Document | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VersionHistoryModal({ document, open, onOpenChange }: VersionHistoryModalProps) {
  if (!document) return null;

  // Mock version history data
  const versionHistory = [
    {
      version: "v2.1",
      date: "2024-01-15",
      time: "14:30",
      author: "Sarah Chen",
      changes: "Updated financial projections for Q4",
      size: "2.4 MB",
      isCurrent: true,
    },
    {
      version: "v2.0",
      date: "2024-01-12",
      time: "09:15",
      author: "Mike Johnson",
      changes: "Added executive summary section",
      size: "2.2 MB",
      isCurrent: false,
    },
    {
      version: "v1.3",
      date: "2024-01-10",
      time: "16:45",
      author: "Sarah Chen",
      changes: "Corrected revenue calculations",
      size: "2.1 MB",
      isCurrent: false,
    },
    {
      version: "v1.2",
      date: "2024-01-08",
      time: "11:20",
      author: "Emily Davis",
      changes: "Updated charts and graphs",
      size: "2.0 MB",
      isCurrent: false,
    },
    {
      version: "v1.1",
      date: "2024-01-05",
      time: "13:10",
      author: "Sarah Chen",
      changes: "Initial draft with basic structure",
      size: "1.8 MB",
      isCurrent: false,
    },
  ];

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

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-lg">📄</span>
            <div>
              <div className="text-lg font-semibold">{document.name}</div>
              <div className="text-sm text-gray-500 font-normal">Version History</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {versionHistory.map((version, index) => (
                  <TableRow key={version.version} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          version.isCurrent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {version.version}
                        </span>
                        {version.isCurrent && (
                          <span className="text-xs text-green-600 font-medium">Current</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {formatDateTime(version.date, version.time)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700">
                            {getAuthorInitials(version.author)}
                          </span>
                        </div>
                        <span className="text-gray-900">{version.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm text-gray-900 truncate" title={version.changes}>
                          {version.changes}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{version.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Download
                        </Button>
                        {!version.isCurrent && (
                          <Button variant="outline" size="sm">
                            Restore
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-500">
            {versionHistory.length} versions • Created {formatDateTime(versionHistory[versionHistory.length - 1].date, versionHistory[versionHistory.length - 1].time)}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>
              Compare Versions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
