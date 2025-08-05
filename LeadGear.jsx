import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const dummyLeads = [
  { id: 1, name: "Rahul Mehta", vehicle: "Honda City", status: "New", assigned: "Amit", date: "2025-08-05" },
  { id: 2, name: "Sneha Rao", vehicle: "Hyundai Creta", status: "Follow-up", assigned: "Priya", date: "2025-08-03" },
  { id: 3, name: "Anil Kumar", vehicle: "Tata Nexon", status: "Booked", assigned: "Karan", date: "2025-08-01" }
];

const sourceData = [
  { name: "Website", value: 45 },
  { name: "Walk-in", value: 30 },
  { name: "Referral", value: 25 }
];

const COLORS = ["#D32F2F", "#FFCC00", "#424242"];

export default function LeadGearApp() {
  const [selectedLead, setSelectedLead] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', vehicle: '', status: 'New', assigned: '', notes: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">LeadGear - HSR Motors</h1>
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="leads">Lead Listing</TabsTrigger>
          <TabsTrigger value="lead-detail">Lead Details</TabsTrigger>
          <TabsTrigger value="lead-management">Lead Management</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <div className="grid grid-cols-3 gap-4">
            <Card><CardContent className="p-4">Total Leads: 120</CardContent></Card>
            <Card><CardContent className="p-4">Booked: 45</CardContent></Card>
            <Card><CardContent className="p-4">Follow-ups Today: 10</CardContent></Card>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Lead Sources</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={sourceData} dataKey="value" outerRadius={80}>
                  {sourceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="leads">
          <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search leads..." className="w-1/3" />
            <Button>Add New Lead</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Assigned</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHeader>
            {dummyLeads.map((lead) => (
              <TableRow key={lead.id} onClick={() => setSelectedLead(lead)} className="cursor-pointer hover:bg-gray-100">
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.vehicle}</TableCell>
                <TableCell><Badge>{lead.status}</Badge></TableCell>
                <TableCell>{lead.assigned}</TableCell>
                <TableCell>{lead.date}</TableCell>
              </TableRow>
            ))}
          </Table>
        </TabsContent>

        <TabsContent value="lead-detail">
          {selectedLead ? (
            <Card>
              <CardContent className="space-y-4 p-6">
                <h2 className="text-xl font-semibold">{selectedLead.name}</h2>
                <p><strong>Vehicle:</strong> {selectedLead.vehicle}</p>
                <p><strong>Status:</strong> {selectedLead.status}</p>
                <p><strong>Assigned To:</strong> {selectedLead.assigned}</p>
                <p><strong>Date:</strong> {selectedLead.date}</p>
                <Button>Schedule Follow-up</Button>
              </CardContent>
            </Card>
          ) : <p>Select a lead to view details.</p>}
        </TabsContent>

        <TabsContent value="lead-management">
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input name="name" value={form.name} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input name="phone" value={form.phone} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Vehicle</Label>
                  <Input name="vehicle" value={form.vehicle} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Input name="assigned" value={form.assigned} onChange={handleInputChange} />
                </div>
                <div>
                  <Label>Status</Label>
                  <Input name="status" value={form.status} onChange={handleInputChange} />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea name="notes" value={form.notes} onChange={handleInputChange} />
              </div>
              <Button>Save Lead</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
