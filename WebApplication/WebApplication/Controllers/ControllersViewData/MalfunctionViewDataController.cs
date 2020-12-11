﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Maintenance.Models.MaintenanceEntities;
using WebApplication.Data;
using WebApplication.Models.Processes;
using WebApplication.Models.ViewData;

namespace WebApplication.Controllers.ControllersViewData
{
    [Route("api/[controller]")]
    [ApiController]
    public class MalfunctionViewDataController : ControllerBase
    {
        private readonly MalfunctionProcess _malfunctionProcess;

        public MalfunctionViewDataController(MaintenanceDatabaseContext context) {
            _malfunctionProcess = new MalfunctionProcess(context);
        }

        // GET: api/MalfunctionViewData
        [HttpGet]
        public IEnumerable<MalfunctionViewData> GetMalfunctions() => _malfunctionProcess.GetMalfunctionsData();

        // GET: api/MalfunctionViewData/5
        [HttpGet("{id}")]
        public MalfunctionViewData GetMalfunction(int id) =>
            _malfunctionProcess.GetMalfunctionData(id);
    }
}