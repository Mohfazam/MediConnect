"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Minus, Loader } from "lucide-react"

export function AddMedicationForm({ onClose, onSubmit }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    organizations: [],
    healthImpacts: [],
    alternatives: [],
    recentUpdates: [],
    incidents: [],
    warnings: [],
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const medication = {
        id: Date.now().toString(),
        ...formData,
      }

      onSubmit(medication)
      onClose()
    } catch (error) {
      alert("Failed to add medication")
    } finally {
      setIsSubmitting(false)
    }
  }

  const addHealthImpact = () => {
    setFormData((prev) => ({
      ...prev,
      healthImpacts: [
        ...(prev.healthImpacts || []),
        { type: "", description: "", severity: "Moderate", evidenceLevel: "Moderate" },
      ],
    }))
  }

  const removeHealthImpact = (index) => {
    setFormData((prev) => ({
      ...prev,
      healthImpacts: prev.healthImpacts?.filter((_, i) => i !== index),
    }))
  }

  const addIncident = () => {
    setFormData((prev) => ({
      ...prev,
      incidents: [
        ...(prev.incidents || []),
        {
          date: new Date().toISOString().split("T")[0],
          description: "",
          severity: 1,
          location: "",
          affectedPatients: 0,
        },
      ],
    }))
  }

  const removeIncident = (index) => {
    setFormData((prev) => ({
      ...prev,
      incidents: prev.incidents?.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full p-6 my-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Add New Medication</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Medication Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.name || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Generic Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.genericName || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, genericName: e.target.value }))}
                />
              </div>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.category || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  required
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.status || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                >
                  <option value="">Select Status</option>
                  <option value="Banned">Banned</option>
                  <option value="Restricted">Restricted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Warning Issued">Warning Issued</option>
                </select>
              </div>
            </div>

            {/* Risk Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bad Effect Score (0-100)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.badEffectScore || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, badEffectScore: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Flagged By Score (0-100)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="100"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={formData.flaggedByScore || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, flaggedByScore: Number(e.target.value) }))}
                />
              </div>
            </div>

            {/* Organizations */}
            <div>
              <label className="block text-sm font-medium mb-1">Organizations</label>
              <div className="flex flex-wrap gap-2">
                {["WHO", "FDA", "ICMR"].map((org) => (
                  <label key={org} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.organizations?.includes(org)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData((prev) => ({
                            ...prev,
                            organizations: [...(prev.organizations || []), org],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            organizations: prev.organizations?.filter((o) => o !== org),
                          }))
                        }
                      }}
                    />
                    <span className="ml-2">{org}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Health Impacts */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Health Impacts</label>
                <button
                  type="button"
                  onClick={addHealthImpact}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Impact
                </button>
              </div>
              <div className="space-y-4">
                {formData.healthImpacts?.map((impact, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        placeholder="Type"
                        required
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        value={impact.type}
                        onChange={(e) => {
                          const newImpacts = [...(formData.healthImpacts || [])]
                          newImpacts[index] = { ...impact, type: e.target.value }
                          setFormData((prev) => ({ ...prev, healthImpacts: newImpacts }))
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        required
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        value={impact.description}
                        onChange={(e) => {
                          const newImpacts = [...(formData.healthImpacts || [])]
                          newImpacts[index] = { ...impact, description: e.target.value }
                          setFormData((prev) => ({ ...prev, healthImpacts: newImpacts }))
                        }}
                      />
                      <div className="flex gap-2">
                        <select
                          required
                          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          value={impact.severity}
                          onChange={(e) => {
                            const newImpacts = [...(formData.healthImpacts || [])]
                            newImpacts[index] = { ...impact, severity: e.target.value }
                            setFormData((prev) => ({ ...prev, healthImpacts: newImpacts }))
                          }}
                        >
                          <option value="High">High</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Low">Low</option>
                        </select>
                        <select
                          required
                          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          value={impact.evidenceLevel}
                          onChange={(e) => {
                            const newImpacts = [...(formData.healthImpacts || [])]
                            newImpacts[index] = { ...impact, evidenceLevel: e.target.value }
                            setFormData((prev) => ({ ...prev, healthImpacts: newImpacts }))
                          }}
                        >
                          <option value="Strong">Strong</option>
                          <option value="Moderate">Moderate</option>
                          <option value="Limited">Limited</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHealthImpact(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Incidents */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Incidents</label>
                <button
                  type="button"
                  onClick={addIncident}
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Incident
                </button>
              </div>
              <div className="space-y-4">
                {formData.incidents?.map((incident, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <input
                        type="date"
                        required
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        value={incident.date}
                        onChange={(e) => {
                          const newIncidents = [...(formData.incidents || [])]
                          newIncidents[index] = { ...incident, date: e.target.value }
                          setFormData((prev) => ({ ...prev, incidents: newIncidents }))
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        required
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                        value={incident.description}
                        onChange={(e) => {
                          const newIncidents = [...(formData.incidents || [])]
                          newIncidents[index] = { ...incident, description: e.target.value }
                          setFormData((prev) => ({ ...prev, incidents: newIncidents }))
                        }}
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Location"
                          required
                          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          value={incident.location}
                          onChange={(e) => {
                            const newIncidents = [...(formData.incidents || [])]
                            newIncidents[index] = { ...incident, location: e.target.value }
                            setFormData((prev) => ({ ...prev, incidents: newIncidents }))
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Affected Patients"
                          required
                          min="0"
                          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                          value={incident.affectedPatients}
                          onChange={(e) => {
                            const newIncidents = [...(formData.incidents || [])]
                            newIncidents[index] = { ...incident, affectedPatients: Number(e.target.value) }
                            setFormData((prev) => ({ ...prev, incidents: newIncidents }))
                          }}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeIncident(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Alternatives */}
            <div>
              <label className="block text-sm font-medium mb-1">Alternative Medications (comma-separated)</label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={formData.alternatives?.join(", ") || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, alternatives: e.target.value.split(",").map((s) => s.trim()) }))
                }
                placeholder="e.g. Medication A, Medication B, Medication C"
              />
            </div>

            {/* Warnings */}
            <div>
              <label className="block text-sm font-medium mb-1">Warnings (comma-separated)</label>
              <input
                type="text"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={formData.warnings?.join(", ") || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, warnings: e.target.value.split(",").map((s) => s.trim()) }))
                }
                placeholder="e.g. Warning 1, Warning 2, Warning 3"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Add Medication"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

