<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $skills = Skill::all();

        return inertia::render('skills/index', [
            'skills' => $skills,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('skills/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|in:beginner,intermediate,advanced',
            'category' => 'required|in:frontend,backend,fullstack,design',
            'percentage' => 'required|integer|min:0|max:100',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $skill = Skill::create([
            'name' => $request->name,
            'level' => $request->level,
            'category' => $request->category,
            'percentage' => $request->percentage,
            'user_id' => auth()->id(),
        ]);

        if ($request->hasFile('logo')) {
            $skill->logo = $request->file('logo')->store('logos', 'public');
            $skill->save();
        }

        return redirect()->route('skills.index')->with('success', 'Skill created successfully.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Skill $skill)
    {
        return inertia('skills/show', [
            'skill' => $skill,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Skill $skill)
    {
        return inertia('skills/edit', [
            'skill' => $skill,
            'user' => auth()->user(),
            'categories' => [
                'frontend' => 'Frontend',
                'backend' => 'Backend',
                'fullstack' => 'Fullstack',
                'design' => 'Design',
            ],
            'levels' => [
                'beginner' => 'Beginner',
                'intermediate' => 'Intermediate',
                'advanced' => 'Advanced',
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Skill $skill)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|in:frontend,backend,fullstack,design',
            'level' => 'required|in:beginner,intermediate,advanced',
            'percentage' => 'required|integer|min:0|max:100',
            'logo' => 'nullable|string',
        ]);

        $skill->update($validated);

        return redirect()->route('skills.index')->with('success', 'Compétence mise à jour avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('skills.index')->with('success', 'Skill deleted successfully.');
    }
}
